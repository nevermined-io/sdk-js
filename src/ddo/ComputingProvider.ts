export interface Provider {
    type: string
    description: string
    environment: {
        cluster: {
            type: string
            url: string
        }
        supportedContainers: {
            image: string
            tag: string
            checksum: string
        }[]
        supportedServers: {
            serverId: string
            serverType: string
            price: string
            cpu: string
            gpu: string
            memory: string
            disk: string
            maxExecutionTime: number
        }[]
    }
}
