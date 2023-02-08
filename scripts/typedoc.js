#!/usr/bin/env node

/* eslint-disable security/detect-non-literal-fs-filename */

const fs = require('fs')
const typedoc = require('typedoc')
const typescript = require('typescript')
const ora = require('ora')
const sdkJsPackage = require('../package.json')

const { description, version } = sdkJsPackage

// Setup our paths, relative to project root
const outPath = './dist/sdk-js.json'
const files = ['./src/sdk.ts']

// specifically point to tsconfig, otherwise TypeDoc fails
const config = typescript.findConfigFile('./tsconfig.js', typescript.sys.fileExists)

const generateJson = () => {
  const spinnerTypedoc = ora('Generating TypeDoc json...').start()

  // Setup our TypeDoc app
  const app = new typedoc.Application({
    tsconfig: config,
  })

  const src = app.expandInputFiles(files)
  const project = app.convert(src)

  // Generate the JSON file
  app.generateJson(project, outPath)

  // Parse and modify json output
  const jsonOrig = JSON.parse(fs.readFileSync(outPath, 'utf8'))

  const jsonFinal = {
    info: {
      title: 'Squid-js',
      description,
      version,
      sourceUrl: 'https://github.com/nevermined-io/sdk-js/blob/master/',
    },
    ...jsonOrig,
  }

  fs.writeFileSync(outPath, JSON.stringify(jsonFinal, null, 4))

  spinnerTypedoc.succeed('Generated TypeDoc json.')
}

generateJson()
