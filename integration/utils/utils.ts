export const transformMetadata = (metadata: any): any => {
    try {
        metadata.main.nonce = Math.random()
    } catch {}
    return metadata
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function repeat<T>(n: number, p: Promise<T>): Promise<T> {
    for (let i = 0; i < n; i++) {
        try {
            return await p
        } catch (err) {}
        await sleep(500)
    }
    return p
}
