import { Nevermined, MetaData, Account, DDO } from '../src'
import { AssetAttributes } from '../src/models/AssetAttributes'
import { AssetPrice } from '../src/models/AssetPrice'
import { generateId } from '../src/utils'
import { config } from '../integration/config'
import { getRoyaltyAttributes, RoyaltyKind } from '../src/nevermined/api/AssetsApi'
import { NFTAttributes } from '../src/models/NFTAttributes'
import BigNumber from '../src/utils/BigNumber'
import { decodeJwt } from 'jose'
import * as fs from 'fs'

const generateDatasetDDO = async (
  nevermined: Nevermined,
  publisher: Account,
  price: AssetPrice,
  userId: string,
  destination: string,
) => {
  const metadata: MetaData = {
    userId: userId,
    main: {
      name: 'Nevermined dataset DDO',
      type: 'dataset',
      dateCreated: '2023-01-01T00:00:00Z',
      datePublished: '2023-01-01T00:00:00Z',
      author: 'root@nevermined.io',
      license: 'Apache License 2.0',
      files: [
        {
          index: 0,
          contentType: 'text/markdown',
          url: 'https://raw.githubusercontent.com/nevermined-io/.github/master/profile/README.md',
          checksum: generateId(),
        },
      ],
    },
    additionalInformation: {
      description: 'Nevermined is an ecosystem development platform.',
      customData: {},
    },
  }

  const assetAttributes = AssetAttributes.getInstance({
    metadata,
    price,
    providers: [config.neverminedNodeAddress!],
  })

  const ddo = await nevermined.assets.create(assetAttributes, publisher)

  console.log(`Writing metadata file to ${destination}/metadata-dataset.json`)
  delete metadata.userId
  fs.writeFileSync(`${destination}/metadata-dataset.json`, JSON.stringify(metadata, undefined, 2))

  console.log(`Writing ddo file to ${destination}/ddo-dataset.json`)
  fs.writeFileSync(`${destination}/ddo-dataset.json`, DDO.serialize(ddo))
}

const generateNftDDO = async (
  nevermined: Nevermined,
  publisher: Account,
  price: AssetPrice,
  userId: string,
  destination: string,
) => {
  const metadata: MetaData = {
    userId: userId,
    main: {
      name: 'Nevermined NFT DDO',
      type: 'dataset',
      dateCreated: '2023-01-01T00:00:00Z',
      datePublished: '2023-01-01T00:00:00Z',
      author: 'root@nevermined.io',
      license: 'Apache License 2.0',
      files: [
        {
          index: 0,
          contentType: 'text/markdown',
          url: 'https://raw.githubusercontent.com/nevermined-io/.github/master/profile/README.md',
          checksum: generateId(),
        },
      ],
    },
    additionalInformation: {
      description: 'Nevermined is an ecosystem development platform.',
      customData: {},
    },
  }

  const assetAttributes = AssetAttributes.getInstance({
    metadata,
    price,
    serviceTypes: ['nft-sales', 'nft-access'],
    providers: [config.neverminedNodeAddress!],
  })
  const royaltyAttributes = getRoyaltyAttributes(nevermined, RoyaltyKind.Standard, 100000)

  const nftAttributes = NFTAttributes.getNFT1155Instance({
    ...assetAttributes,
    nftContractAddress: nevermined.nfts1155.nftContract.address,
    cap: BigNumber.from(10),
    amount: BigNumber.from(1),
    royaltyAttributes,
    preMint: true,
  })

  const ddo = await nevermined.nfts1155.create(nftAttributes, publisher)

  console.log(`Writing metadata file to ${destination}/metadata-nft.json`)
  delete metadata.userId
  fs.writeFileSync(`${destination}/metadata-nft.json`, JSON.stringify(metadata, undefined, 2))

  console.log(`Writing ddo file to ${destination}/ddo-nft.json`)
  fs.writeFileSync(`${destination}/ddo-nft.json`, DDO.serialize(ddo))
}

const generateAlgorithmDDO = async (
  nevermined: Nevermined,
  publisher: Account,
  price: AssetPrice,
  userId: string,
  destination: string,
) => {
  const metadata: MetaData = {
    userId: userId,
    main: {
      name: 'Nevermined algorithm DDO',
      type: 'algorithm',
      dateCreated: '2023-01-01T00:00:00Z',
      datePublished: '2023-01-01T00:00:00Z',
      author: 'root@nevermined.io',
      license: 'Apache License 2.0',
      files: [
        {
          index: 0,
          contentType: 'text/markdown',
          url: 'https://example.com/word_count.py',
          checksum: generateId(),
        },
      ],
      algorithm: {
        language: 'python',
        format: 'py',
        version: '0.1.0',
        entrypoint: 'python word_count.py',
        requirements: {
          container: {
            image: 'python',
            tag: '3.8-alpine',
          },
        },
      },
    },
    additionalInformation: {
      description: 'Nevermined is an ecosystem development platform.',
      customData: {},
    },
  }

  const assetAttributes = AssetAttributes.getInstance({
    metadata,
    price,
    providers: [config.neverminedNodeAddress!],
  })

  const ddo = await nevermined.assets.create(assetAttributes, publisher)

  console.log(`Writing metadata file to ${destination}/metadata-algorithm.json`)
  delete metadata.userId
  fs.writeFileSync(`${destination}/metadata-algorithm.json`, JSON.stringify(metadata, undefined, 2))

  console.log(`Writing ddo file to ${destination}/ddo-algorithm.json`)
  fs.writeFileSync(`${destination}/ddo-algorithm.json`, DDO.serialize(ddo))
}

const generateWorkflowDDO = async (
  nevermined: Nevermined,
  publisher: Account,
  price: AssetPrice,
  userId: string,
  destination: string,
) => {
  const metadata: MetaData = {
    userId: userId,
    main: {
      name: 'Nevermined workflow DDO',
      type: 'workflow',
      dateCreated: '2023-01-01T00:00:00Z',
      datePublished: '2023-01-01T00:00:00Z',
      author: 'root@nevermined.io',
      license: 'Apache License 2.0',
      files: [],
      workflow: {
        coordinationType: 'argo',
        stages: [
          {
            index: 0,
            stageType: 'Compute',
            input: [
              {
                index: 0,
                id: 'did:nv:56479438c221a9a49b49b52da0fefdd1de67a7d5be267d02ba92b9b38dfd3ea1',
              },
            ],
            transformation: {
              id: 'did:nv:1a9ce6b48364642a66e8a1d9c2957a582c33d3c1473e0af72aa483e933e2afa5',
            },
            output: {
              metadataUrl: 'https://marketplace-api.mumbai.public.nevermined.network/',
              accessProxyUrl: 'https://node.mumbai.public.nevermined.network/api/v1/gateway/',
              metadata: {} as any,
            },
          },
        ],
      },
    },
    additionalInformation: {
      description: 'Nevermined is an ecosystem development platform.',
      customData: {},
    },
  }

  const assetAttributes = AssetAttributes.getInstance({
    metadata,
    price,
    providers: [config.neverminedNodeAddress!],
  })

  const ddo = await nevermined.assets.create(assetAttributes, publisher)

  console.log(`Writing metadata file to ${destination}/metadata-workflow.json`)
  delete metadata.userId
  fs.writeFileSync(`${destination}/metadata-workflow.json`, JSON.stringify(metadata, undefined, 2))

  console.log(`Writing ddo file to ${destination}/ddo-workflow.json`)
  fs.writeFileSync(`${destination}/ddo-workflow.json`, DDO.serialize(ddo))
}

const generateComputeDDO = async (
  nevermined: Nevermined,
  publisher: Account,
  price: AssetPrice,
  userId: string,
  destination: string,
) => {
  const metadata: MetaData = {
    userId: userId,
    main: {
      name: 'Nevermined dataset DDO',
      type: 'dataset',
      dateCreated: '2023-01-01T00:00:00Z',
      datePublished: '2023-01-01T00:00:00Z',
      author: 'root@nevermined.io',
      license: 'Apache License 2.0',
      files: [
        {
          index: 0,
          contentType: 'text/markdown',
          url: 'https://raw.githubusercontent.com/nevermined-io/.github/master/profile/README.md',
          checksum: generateId(),
        },
      ],
    },
    additionalInformation: {
      description: 'Nevermined is an ecosystem development platform.',
      customData: {},
    },
  }

  const assetAttributes = AssetAttributes.getInstance({
    metadata,
    price,
    serviceTypes: ['compute'],
    providers: [config.neverminedNodeAddress!],
  })

  const ddo = await nevermined.assets.create(assetAttributes, publisher)

  console.log(`Writing metadata file to ${destination}/metadata-compute.json`)
  delete metadata.userId
  fs.writeFileSync(`${destination}/metadata-compute.json`, JSON.stringify(metadata, undefined, 2))

  console.log(`Writing ddo file to ${destination}/ddo-compute.json`)
  fs.writeFileSync(`${destination}/ddo-compute.json`, DDO.serialize(ddo))
}

const main = async () => {
  const nevermined = await Nevermined.getInstance(config)
  const [publisher] = await nevermined.accounts.list()

  const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher)
  await nevermined.services.marketplace.login(clientAssertion)
  const payload = decodeJwt(config.marketplaceAuthToken!)

  const userId = payload.sub!
  const price = new AssetPrice(publisher.getId(), BigNumber.from(1))

  const destination = process.argv[2] || process.cwd()
  console.log(process.argv)

  await generateDatasetDDO(nevermined, publisher, price, userId, destination)
  await generateNftDDO(nevermined, publisher, price, userId, destination)
  await generateAlgorithmDDO(nevermined, publisher, price, userId, destination)
  await generateWorkflowDDO(nevermined, publisher, price, userId, destination)
  await generateComputeDDO(nevermined, publisher, price, userId, destination)
}

;(async () => {
  await main()
})()
