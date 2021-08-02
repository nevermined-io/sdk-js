import { BodyInit, RequestInit, Response } from 'node-fetch'
import fs, { ReadStream } from 'fs'
import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import save from 'save-file'
import FormData from 'form-data'
import * as path from 'path'

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
                'Content-type': 'application/json',
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
            })
        } else {
            await save(await response.arrayBuffer(), filename)
            destination = process.cwd()
        }

        const d = path.join(destination, filename)
        this.logger.log(`Downloaded: ${d}`)

        return d
    }

    public async uploadFile(url: string, stream: ReadStream): Promise<any> {
        const form = new FormData()
        form.append('file', stream)
        return this.fetch(url, {
            method: 'POST',
            body: form
        })
    }

    public async fetchToken(url: string, grantToken: string): Promise<Response> {
        return await this.nevermined.utils.fetch.fetch(url, {
            method: 'POST',
            body: `grant_type=${encodeURI(
                this.nevermined.utils.jwt.GRANT_TYPE
            )}&assertion=${encodeURI(grantToken)}`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
    }

    private async fetch(url: string, opts: RequestInit): Promise<Response> {
        const result = await fetch(url, opts)
        if (!result.ok) {
            this.logger.error(`Error requesting [${opts.method}] ${url}`)
            this.logger.error(`Response message: \n${await result.text()}`)
            throw result
        }
        return result
    }
}
