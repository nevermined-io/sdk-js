
import { zeroX } from '../utils'

export class BabyjubPublicKey {
    public x: string
    public y: string

    public param(): Array<string> {
        return [zeroX(this.x), zeroX(this.y)]
    }
}

export class MimcCipher {
    public x: string
    public y: string

    public param(): Array<string> {
        return [zeroX(this.x), zeroX(this.y)]
    }
}

