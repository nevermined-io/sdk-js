export const transformMetadata = (metadata: any): any => {
    try {
        metadata.main.nonce = Math.random()
    } catch { }
    return metadata
}
