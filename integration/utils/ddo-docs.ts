const fetch = require('node-fetch').default

const getMetadataFromUrl = (url: string) => async () =>
    JSON.parse(await fetch(url).then(res => res.text()))
        .service[0]
        .attributes

export const getDocsCommonMetadata = getMetadataFromUrl('https://raw.githubusercontent.com/keyko-io/nevermined-docs/master/docs/architecture/specs/examples/metadata/v0.1/ddo-example-access.json')
export const getDocsAlgorithmMetadata = getMetadataFromUrl('https://raw.githubusercontent.com/keyko-io/nevermined-docs/master/docs/architecture/specs/examples/metadata/v0.1/ddo-example-algorithm.json')
export const getDocsWorkflowMetadata = getMetadataFromUrl('https://raw.githubusercontent.com/keyko-io/nevermined-docs/master/docs/architecture/specs/examples/metadata/v0.1/ddo-example-workflow.json')
