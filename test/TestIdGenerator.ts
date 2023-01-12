import { generateId } from '../src/utils'

export default class TestIdGenerator {
    public static generatePrefixedId() {
        return '0x' + generateId()
    }
}
