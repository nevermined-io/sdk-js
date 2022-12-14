import { transformMetadata } from './utils'
import { MetaData } from '../../src'
import * as NodeFetch from 'node-fetch'

const fetch = NodeFetch.default

const getMetadataFromUrl = (url: string) => async (): Promise<MetaData> =>
    transformMetadata(
        JSON.parse(await fetch(url).then(res => res.text())).service[0].attributes
    )

const getFromUrl = (url: string) => async (): Promise<MetaData> =>
    transformMetadata(JSON.parse(await fetch(url).then(res => res.text())))

export const getDocsCommonMetadata = getFromUrl(
    'https://raw.githubusercontent.com/nevermined-io/docs-legacy/master/docs/architecture/specs/examples/metadata/v0.1/metadata1.json'
)
export const getDocsAlgorithmMetadata = getMetadataFromUrl(
    'https://raw.githubusercontent.com/nevermined-io/docs-legacy/master/docs/architecture/specs/examples/metadata/v0.1/ddo-example-algorithm.json'
)
export const getDocsWorkflowMetadata = getMetadataFromUrl(
    'https://raw.githubusercontent.com/nevermined-io/docs-legacy/master/docs/architecture/specs/examples/metadata/v0.1/ddo-example-workflow.json'
)
export const getDocsComputeMetadata = getFromUrl(
    'https://raw.githubusercontent.com/nevermined-io/docs-legacy/master/docs/architecture/specs/examples/metadata/v0.1/computing-metadata.json'
)
