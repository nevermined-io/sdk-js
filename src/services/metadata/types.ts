export interface NewBookmark {
    did: string
    userId: string
    description: string
}

export interface Bookmark extends NewBookmark {
    id: string
    createdAt: Date
}

export enum PermissionType {
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
    Admin = 'admin'
}

export interface NewPermission {
    userId: string
    type: PermissionType[]
    issuer: string
    holder: string
}

export interface Permission extends NewPermission {
    id: string
    issuanceDate: Date
}

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
