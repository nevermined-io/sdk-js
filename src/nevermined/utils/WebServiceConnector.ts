import { BodyInit, RequestInit, Response } from 'node-fetch'
import fs, { ReadStream } from 'fs'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import FormData from 'form-data'
import * as path from 'path'
import fileDownload from 'js-file-download'
import { HttpError } from '../../errors'
import { URL } from 'whatwg-url'

let fetch
if (typeof window !== 'undefined') {
    fetch = window.fetch.bind(window)
} else {
    fetch = require('node-fetch')
}

// Nevermined already has a File type
export type WebApiFile = File

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
        url: string | URL,
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
        headers?: { [key: string]: string }
    ): Promise<string> {
        const { response, name } = await this.getFileResponse(url, index, headers)

        if (destination) {
            await new Promise(async (resolve, reject) => {
                fs.mkdirSync(destination, { recursive: true })
                const fileStream = fs.createWriteStream(`${destination}${name}`)
                response.body.pipe(fileStream)
                response.body.on('error', reject)
                fileStream.on('finish', resolve)
                fileStream.on('close', resolve)
            })
        } else {
            const buff = await response.arrayBuffer()
            fileDownload(buff, name)
            destination = process.cwd()
        }
        const d = path.join(destination, name)
        this.logger.log(`Downloaded: ${d}`)
        return d
    }

    public async getFile(
        url: string,
        index?: number,
        headers?: { [key: string]: string }
    ): Promise<WebApiFile> {
        const { response, name } = await this.getFileResponse(url, index, headers)
        const blob = (await response.blob()) as Blob
        return new File([blob], name) as WebApiFile
    }

    private async getFileResponse(
        url: string,
        index?: number,
        headers?: { [key: string]: string }
    ): Promise<{ response: Response; name: string }> {
        const response = await this.get(url, headers)
        if (!response.ok) {
            throw new Error('Response error.')
        }

        let name: string
        try {
            ;[, name] = response.headers
                .get('content-disposition')
                .match(/attachment;filename=(.+)/)
        } catch {
            try {
                name = url.split('/').pop()
            } catch {
                name = `file${index}`
            }
        }

        return { response, name }
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
        numberTries = 1
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
        url: string | URL,
        opts: RequestInit,
        numberTries = 1
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
    }

    private _sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}
