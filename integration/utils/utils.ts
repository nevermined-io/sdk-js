export const transformMetadata = (metadata: any): any => {
    try {
        metadata.main.nonce = Math.random()
    } catch {}
    return metadata
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
