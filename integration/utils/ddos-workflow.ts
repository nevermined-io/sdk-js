import { MetaData } from '../../src'
import { transformMetadata } from './utils'

export const workflowMetadatas = {
    metadata: (userId: string): MetaData =>
        transformMetadata({
            userId,
            main: {
                name: 'Nevermined protocol white paper',
                dateCreated: '2012-02-01T10:55:11Z',
                author: 'Mario',
                license: 'CC0: Public Domain',
                files: [
                    {
                        index: 0,
                        contentType: 'text/text',
                        checksum: `0000000000000000000000000000000`,
                        checksumType: 'MD5',
                        contentLength: '12057507',
                        url: 'https://raw.githubusercontent.com/nevermined-io/tools/master/README.md'
                    }
                ],
                type: 'dataset'
            }
        }),

    algorithm: (userId: string): MetaData =>
        transformMetadata({
            userId,
            main: {
                author: 'John Doe',
                dateCreated: '2019-02-08T08:13:49Z',
                license: 'CC-BY',
                name: 'My workflow',
                files: [
                    {
                        index: 0,
                        contentType: 'text/text',
                        checksum: `0000000000000000000000000000000`,
                        checksumType: 'MD5',
                        contentLength: '12057507',
                        url: 'https://raw.githubusercontent.com/nevermined-io/docs-legacy/515d4f5da771dae0a4827ba757ce9b018e66276f/resources/word_count.py'
                    }
                ],
                type: 'algorithm',
                algorithm: {
                    language: 'python',
                    format: 'py',
                    version: '0.1',
                    entrypoint: 'python word_count.py*',
                    requirements: {
                        container: {
                            image: 'python',
                            tag: '3.8-alpine',
                            checksum:
                                'sha256:53ad3a03b2fb240b6c494339821e6638cd44c989bcf26ec4d51a6a52f7518c1d'
                        }
                    }
                }
            }
        }),

    compute: (userId: string): MetaData =>
        transformMetadata({
            userId,
            main: {
                name: 'Nevermined protocol white paper',
                dateCreated: '2012-02-01T10:55:11Z',
                author: 'Mario',
                license: 'CC0: Public Domain',
                files: [
                    {
                        index: 0,
                        contentType: 'text/text',
                        checksum: `0000000000000000000000000000000`,
                        checksumType: 'MD5',
                        contentLength: '12057507',
                        url: 'https://raw.githubusercontent.com/nevermined-io/tools/master/README.md'
                    }
                ],
                type: 'compute'
            }
        }),

    workflow: (dataDid: string, transformDid: string, userId: string): MetaData =>
        transformMetadata({
            userId,
            main: {
                author: 'John Doe',
                dateCreated: '2019-02-08T08:13:49Z',
                datePublished: '2019-05-08T08:13:49Z',
                license: 'CC-BY',
                name: 'My workflow',
                type: 'workflow',
                workflow: {
                    coordinationType: 'argo',
                    stages: [
                        {
                            index: 0,
                            stageType: 'Filtering',
                            input: [
                                {
                                    index: 0,
                                    id: dataDid
                                }
                            ],
                            transformation: {
                                id: transformDid
                            },
                            output: {
                                metadataUrl:
                                    'https://localhost:5000/api/v1/metadata/assets/ddo/',
                                accessProxyUrl: 'https://localhost:8030/api/v1/node/',
                                metadata: {} as any
                            }
                        }
                    ]
                }
            }
        })
}
