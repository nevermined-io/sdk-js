import { generateId } from '../src/utils/GeneratorHelpers'

export default class TestIdGenerator {
    public static generatePrefixedId() {
        return '0x' + generateId()
    }
}
