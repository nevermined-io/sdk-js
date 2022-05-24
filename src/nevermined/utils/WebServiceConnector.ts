import { BodyInit, RequestInit, Response } from 'node-fetch'
import fs, { ReadStream } from 'fs'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import FormData from 'form-data'
import * as path from 'path'
import fileDownload from 'js-file-download'
import { HttpError } from '../../errors'

let fetch
if (typeof window !== 'undefined') {
    fetch = window.fetch.bind(window)
} else {
    fetch = require('node-fetch')
}

/**
 * Provides a common interface to web services.
 */
export class WebServiceConnector extends Instantiable {
    constructor(config: InstantiableConfig) {
        super()
        this.setInstanceConfig(config)
    }

    public post(
        url: string,
        payload: BodyInit,
        headers: { [header: string]: string } = {}
    ): Promise<Response> {
        return this.fetch(url, {
            method: 'POST',
            body: payload,
            headers: {
                'Content-type': 'application/json',
                ...headers
            }
        })
    }

    public get(
        url: string,
        headers: { [header: string]: string } = {}
    ): Promise<Response> {
        return this.fetch(url, {
            method: 'GET',
            headers: {
                ...headers
            }
        })
    }

    public put(
        url: string,
        payload: BodyInit,
        headers: { [header: string]: string } = {}
    ): Promise<Response> {
        return this.fetch(url, {
            method: 'PUT',
            body: payload,
            headers: {
                'Content-type': 'application/json',
                ...headers
            }
        })
    }

    public delete(
        url: string,
        payload?: BodyInit,
        headers: { [header: string]: string } = {}
    ): Promise<Response> {
        return this.fetch(url, {
            method: 'DELETE',
            body: payload,
            headers: {
                'Content-type': 'application/json',
                ...headers
            }
        })
    }

    public async downloadFile(
        url: string,
        destination?: string,
        index?: number,
        headers?: any
    ): Promise<string> {
        const response = await this.get(url, headers)
        if (!response.ok) {
            throw new Error('Response error.')
        }
        let filename: string
        try {
            filename = response.headers
                .get('content-disposition')
                .match(/attachment;filename=(.+)/)[1]
        } catch {
            try {
                filename = url.split('/').pop()
            } catch {
                filename = `file${index}`
            }
        }

        if (destination) {
            // eslint-disable-next-line no-async-promise-executor
            await new Promise(async (resolve, reject) => {
                fs.mkdirSync(destination, { recursive: true })
                const fileStream = fs.createWriteStream(`${destination}${filename}`)
                response.body.pipe(fileStream)
                response.body.on('error', reject)
                fileStream.on('finish', resolve)
                fileStream.on('close', resolve)
            })
        } else {
            const buff = await response.arrayBuffer()
            fileDownload(buff, filename)
            destination = process.cwd()
        }
        const d = path.join(destination, filename)
        this.logger.log(`Downloaded: ${d}`)
        return d
    }

    public async downloadUrl(url: string, headers?: any): Promise<string> {
        const response = await this.get(url, headers)
        if (!response.ok) {
            throw new Error('Response error.')
        }
        return await response.text()
    }

    public async uploadFile(
        url: string,
        stream: ReadStream,
        encrypt?: boolean
    ): Promise<any> {
        const form = new FormData()
        form.append('file', stream)
        if (encrypt) {
            form.append('encrypt', 'true')
        }
        return this.fetch(url, { method: 'POST', body: form })
    }

    public async fetchToken(
        url: string,
        grantToken: string,
        numberTries: number = 1
    ): Promise<Response> {
        return await this.nevermined.utils.fetch.fetch(
            url,
            {
                method: 'POST',
                body: `grant_type=${encodeURI(
                    this.nevermined.utils.jwt.GRANT_TYPE
                )}&assertion=${encodeURI(grantToken)}`,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            },
            numberTries
        )
    }

    private async fetch(
        url: string,
        opts: RequestInit,
        numberTries: number = 1
    ): Promise<Response> {
        let counterTries = 1
        let result: Response
        while (counterTries <= numberTries) {
            result = await fetch(url, opts)
            if (result.ok) return result

            counterTries++
            this.logger.debug(`Sleeping ...`)
            await this.nevermined.utils.fetch._sleep(500)
        }

        throw new HttpError(
            `Request ${opts.method} ${url} fail - ${await result.clone().text()}`,
            result.status
        )
        // this.logger.error(`Error requesting [${opts.method}] ${url}`)
        // this.logger.error(`Response message: \n${await result.clone().text()}`)
        // throw result

        // if (!result.ok) {
        // }
        // return result
    }

    private _sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}
