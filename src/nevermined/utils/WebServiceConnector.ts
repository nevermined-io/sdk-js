import { BodyInit, RequestInit, Response } from 'node-fetch'
import fs, { ReadStream } from 'fs'
import { InstantiableConfig } from '@/Instantiable.abstract'
import FormData from 'form-data'
import * as path from 'path'
import fileDownload from 'js-file-download'
import { URL } from 'whatwg-url'
import { JwtUtils } from '@/nevermined/utils/JwtUtils'
import { HttpError } from '@/errors/NeverminedErrors'

let fetch
if (typeof window !== 'undefined') {
  fetch = window.fetch.bind(window)
} else {
  fetch = require('node-fetch')
}

/**
 * Provides a common interface to web services.
 */
export class WebServiceConnector {
  // extends Instantiable {

  config: InstantiableConfig

  constructor(config: InstantiableConfig) {
    // super()
    // this.setInstanceConfig(config)
    this.config = config
  }

  public post(
    url: string,
    payload: BodyInit,
    headers: { [header: string]: string } = {},
  ): Promise<Response> {
    return this.fetch(url, {
      method: 'POST',
      body: payload,
      headers: {
        'Content-type': 'application/json',
        ...headers,
      },
    })
  }

  public get(url: string | URL, headers: { [header: string]: string } = {}): Promise<Response> {
    return this.fetch(url, {
      method: 'GET',
      headers: {
        ...headers,
      },
    })
  }

  public put(
    url: string,
    payload: BodyInit,
    headers: { [header: string]: string } = {},
  ): Promise<Response> {
    return this.fetch(url, {
      method: 'PUT',
      body: payload,
      headers: {
        'Content-type': 'application/json',
        ...headers,
      },
    })
  }

  public delete(
    url: string,
    payload?: BodyInit,
    headers: { [header: string]: string } = {},
  ): Promise<Response> {
    return this.fetch(url, {
      method: 'DELETE',
      body: payload,
      headers: {
        'Content-type': 'application/json',
        ...headers,
      },
    })
  }

  public async downloadFile(
    url: string,
    destination?: string,
    index?: number,
    headers?: { [key: string]: string },
  ): Promise<string> {
    const { response, name } = await this.getFileResponse(url, index, headers)

    if (destination) {
      await new Promise((resolve, reject) => {
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
    return d
  }

  private async getFileResponse(
    url: string,
    index?: number,
    headers?: { [key: string]: string },
  ): Promise<{ response: Response; name: string }> {
    const response = await this.get(url, headers)
    if (!response.ok) {
      throw new Error('Response error.')
    }

    let name: string
    try {
      //prettier-ignore
      [, name] = response.headers.get('content-disposition').match(/attachment;filename=(.+)/)
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

  public async uploadMessage(url: string, data: string, encrypt?: boolean): Promise<any> {
    const form = new FormData()
    form.append('message', data)
    if (encrypt) {
      form.append('encrypt', 'true')
    }
    return this.fetch(url, { method: 'POST', body: form })
  }

  public async uploadFile(url: string, data: ReadStream, encrypt?: boolean): Promise<any> {
    console.log(`Trying to upload file`)
    const form = new FormData()
    form.append('file', data)
    if (encrypt) {
      form.append('encrypt', 'true')
    }
    return this.fetch(url, { method: 'POST', body: form })
  }

  public async fetchToken(url: string, grantToken: string, numberTries = 1): Promise<Response> {
    return await fetch(
      url,
      {
        method: 'POST',
        body: `client_assertion_type=${encodeURI(
          JwtUtils.CLIENT_ASSERTION_TYPE,
        )}&client_assertion=${encodeURI(grantToken)}`,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      },
      numberTries,
    )
  }

  public async fetchCID(cid: string): Promise<string> {
    const url = `${this.config.config.ipfsGateway}/api/v0/cat?arg=${cid.replace('cid://', '')}`
    const authToken = WebServiceConnector.getIPFSAuthToken()
    const options = {
      method: 'POST',
      ...(authToken && {
        headers: { Authorization: `Basic ${authToken}` },
      }),
    }

    return fetch(url, options).then(async (res) => {
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText} - ${await res.text()}`)
      }
      return res.text()
    })
  }

  private static getIPFSAuthToken(): string | undefined {
    if (!process.env.IPFS_PROJECT_ID || !process.env.IPFS_PROJECT_SECRET) {
      return undefined
    } else {
      return Buffer.from(
        `${process.env.IPFS_PROJECT_ID}:${process.env.IPFS_PROJECT_SECRET}`,
      ).toString('base64')
    }
  }

  private async fetch(url: string | URL, opts: RequestInit, numberTries = 1): Promise<Response> {
    let counterTries = 1
    let result: Response
    while (counterTries <= numberTries) {
      result = await fetch(url, opts)
      if (result.ok) return result

      counterTries++
      await this._sleep(500)
    }

    throw new HttpError(
      `Request ${opts.method} ${url} fail - ${await result.clone().text()}`,
      result.status,
    )
  }

  private _sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
