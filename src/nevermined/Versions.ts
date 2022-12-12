import * as metadata from '../metadata.json'

import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'

export enum PlatformTechStatus {
    Loading = 'Loading',
    Unknown = 'Unknown',
    Stopped = 'Stopped',
    Working = 'Working'
}

export interface PlatformTech {
    name: string
    version?: string
    commit?: string
    status: PlatformTechStatus
}

export interface PlatformKeeperTech extends PlatformTech {
    network?: string
    keeperVersion?: string
    contracts?: { [contractName: string]: string }
    providerAddress?: string
}

export interface PlatformVersions {
    sdk: PlatformKeeperTech
    metadata: PlatformTech
    node: PlatformKeeperTech
    status: {
        ok: boolean
        contracts: boolean
        network: boolean
    }
}

/**
 * Versions submodule .
 */
export class Versions extends Instantiable {
    /**
     * Returns the instance of Versions.
     * @returns {@link Versions}
     */
    public static async getInstance(config: InstantiableConfig): Promise<Versions> {
        const instance = new Versions()
        instance.setInstanceConfig(config)

        return instance
    }

    public async get(): Promise<PlatformVersions> {
        const versions = {} as PlatformVersions

        // Squid
        versions.sdk = {
            name: 'Sdk-js',
            version: metadata.version,
            commit: metadata.commit,
            status: PlatformTechStatus.Working,
            network: (await this.nevermined.keeper.getNetworkName()).toLowerCase(),
            keeperVersion: this.nevermined.keeper.version,
            contracts: Object.values(await this.nevermined.keeper.getAllInstances())
                .filter(_ => !!_)
                .reduce(
                    (acc, { contractName, address }) => ({
                        ...acc,
                        [contractName]: address
                    }),
                    {}
                )
        }

        // Node
        try {
            const {
                contracts,
                'keeper-version': keeperVersion,
                'provider-address': providerAddress,
                network,
                software: name,
                version
            } = await this.nevermined.services.node.getVersionInfo()
            versions.node = {
                name,
                status: PlatformTechStatus.Working,
                version,
                contracts,
                network: network.toLowerCase(),
                keeperVersion: keeperVersion.replace(/^v/, ''),
                providerAddress
            }
        } catch {
            versions.node = {
                name: 'Node',
                status: PlatformTechStatus.Stopped
            }
        }

        // Metadata
        try {
            const { software: name, version } =
                await this.nevermined.services.metadata.getVersionInfo()
            versions.metadata = {
                name,
                status: PlatformTechStatus.Working,
                version
            }
        } catch {
            versions.metadata = {
                name: 'Metadata',
                status: PlatformTechStatus.Stopped
            }
        }

        // Status
        const techs: PlatformKeeperTech[] = Object.values(versions as any)

        const networks = techs
            .map(({ network }) => network)
            .filter(_ => !!_)
            .reduce((acc, network) => ({ ...acc, [network]: true }), {})

        let contractStatus = true
        const contractList = techs.map(({ contracts }) => contracts).filter(_ => !!_)
        Array.from(contractList.map(Object.keys))
            .reduce((acc, _) => [...acc, ..._], [])
            .filter((_, i, list) => list.indexOf(_) === i)
            .forEach(name => {
                let address
                contractList
                    .map(_ => _[name])
                    .forEach(_ => {
                        if (!address) {
                            address = _
                            return
                        }
                        if (address !== _) {
                            this.logger.debug(
                                `Addresses doesn't match for contract ${name}`
                            )
                            contractStatus = false
                        }
                    })
            })

        versions.status = {
            ok: !techs.find(({ status }) => status !== PlatformTechStatus.Working),
            network: Object.keys(networks).length === 1,
            contracts: contractStatus
        }

        return versions
    }
}
