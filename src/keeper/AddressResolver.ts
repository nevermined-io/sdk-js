import fs from 'fs'
import path from 'path'
import addressbook from '../artifacts/addressbook.json'
import Config from "../models/Config";

const DEFAULT_ADDRESS_BOOK = ''

const loadJsonFile = (filepath: string): any => {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'))
}

export const createAddressBookFromArtifacts = (artifactsFolder: string, saveFile?: string) => {
    const addressBook = {}
    const files = fs.readdirSync(artifactsFolder)
    for (const file of files) {
        let nameParts = file.split('.')
        if (nameParts.length !== 3 || nameParts[2] !== 'json') {
            continue
        }
        const filepath = path.join(artifactsFolder, file)
        const artifactObject = loadJsonFile(filepath)
        if (artifactObject === undefined || artifactObject === null || !artifactObject.abi) {
            continue
        }
        const networkName = nameParts[1]
        if (!addressBook[networkName]) {
            addressBook[networkName] = {}
        }
        addressBook[networkName][artifactObject.name] = artifactObject.address
        console.debug(`file: ${file}, network.name.address: \
            ${networkName}.${artifactObject.name}.${artifactObject.address}`)
    }
    if (addressBook && saveFile) {
        fs.writeFile (saveFile, JSON.stringify(addressBook, null, 2), function(err) {
            if (err) throw err;
            console.log(`wrote addressBook to ${saveFile}`);
        });
    }

    return addressBook
}

export const getAddressBook = (config): any => {
    if (!config.addressBook) {
        return addressbook
    }
    return loadJsonFile(config.addressBook)
}

export const getContractAddress = (config: Config, name: string, network: string): string => {
    const _addressBook = getAddressBook(config)
    if (!_addressBook || !_addressBook[network]) {
        return null
    }
    return _addressBook[network][name]
}
