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
