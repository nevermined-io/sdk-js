import { ethers } from 'ethers'

export default class BigNumber extends ethers.BigNumber {
    public static parseEther(value: string): BigNumber {
        return ethers.utils.parseEther(value)
    }

    public static parseUnits(value: string, decimals: number = 18): BigNumber {
        return ethers.utils.parseUnits(value, decimals)
    }

    public static formatEther(value: BigNumber): string {
        return ethers.utils.formatEther(value)
    }

    public static formatUnits(value: BigNumber, decimals: number = 18): string {
        return ethers.utils.formatUnits(value, decimals)
    }
}
