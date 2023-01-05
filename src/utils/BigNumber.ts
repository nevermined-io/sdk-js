import { ethers } from 'ethers'

export class BigNumber extends ethers.BigNumber {
    /**
     * Converts a ether _value_ into _wei_.
     *
     * @param value - The string value to convert
     * @returns The BigNumber representation of _value_ in _wei_
     *
     * @example
     * ```ts
     * parseEther("1.0")
     * // { BigNumber: "1000000000000000000" }
     *
     * parseEther("-0.5")
     * // { BigNumber: "-500000000000000000" }
     * ```
     */
    public static parseEther(value: string): BigNumber {
        return ethers.utils.parseEther(value)
    }

    /**
     * Returns a BigNumber representation of value, parsed with _decimal_ digits.
     *
     * @param value - The string value to convert
     * @param decimals - The number of decimals
     * @returns The BigNumber representation of _value_ parsed with _decimals_
     *
     * @example
     * ```ts
     * parseUnits("1.0", 18)
     * // { BigNumber: "1000000000000000000" }
     *
     * parseUnits("121.0", 9);
     * // { BigNumber: "121000000000" }
     * ```
     */
    public static parseUnits(value: string, decimals = 18): BigNumber {
        return ethers.utils.parseUnits(value, decimals)
    }

    /**
     * Converts a _wei_ value into _ether_.
     *
     * @param value - The value to format.
     * @returns The string of the formated value
     *
     * @example
     * ```ts
     * const value = BigNumber.from("1000000000000000000")
     *
     * formatEther(value)
     * // '1.0'
     * ```
     */
    public static formatEther(value: BigNumber): string {
        return ethers.utils.formatEther(value)
    }

    /**
     * Returns a string representation of value formatted with _decimal_ digits.
     *
     * @param value - The value to format.
     * @returns The string of the formated value
     *
     * @example
     * ```ts
     * const oneEther = BigNumber.from("1000000000000000000")
     *
     * formatUnits(oneEther, 18)
     * // '1.0'
     * ```
     */
    public static formatUnits(value: BigNumber, decimals = 18): string {
        return ethers.utils.formatUnits(value, decimals)
    }
}
