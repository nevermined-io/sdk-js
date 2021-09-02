
import { zeroX } from '../utils'

export class BabyjubPublicKey {
    // 32 byte hex strings with 0x
    public x: string
    public y: string

    public constructor(x: string, y: string) {
        this.x = x
        this.y = y
    }

    public param(): Array<string> {
        return [zeroX(this.x), zeroX(this.y)]
    }
}

export class MimcCipher {
    // 32 byte hex strings with 0x
    public x: string
    public y: string

    public constructor(x: string, y: string) {
        this.x = x
        this.y = y
    }

    public param(): Array<string> {
        return [zeroX(this.x), zeroX(this.y)]
    }
}

