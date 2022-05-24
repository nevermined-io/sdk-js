export enum State {
    Disabled = 'disabled',
    Unconfirmed = 'unconfirmed',
    Confirmed = 'confirmed'
}

export interface NewProfile {
    isListed: boolean
    state: State
    addresses: string[]
    nickname: string
    name?: string
    email?: string
    additionalInformation?: unknown
}

export interface Profile extends NewProfile {
    userId: string
    creationDate: Date
    updateDate: Date
}
