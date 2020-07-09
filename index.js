#! /usr/bin/env node

const fetch = require('node-fetch')

const srpcArguments = process.argv.slice(2)

const cliName = 'srpc'

const urlId = '--url'
const methodId = '--method'
const paramsId = '--params'

const cliArgumentsIds = [urlId, methodId, paramsId]

const urlArg = srpcArguments.find(arg => arg.includes(urlId))
const methodArg = srpcArguments.find(arg => arg.includes(methodId))
const paramsArg = srpcArguments.find(arg => arg.includes(paramsId))

if (!urlArg || !methodArg) {
  console.log(`Usage: ${cliName} ${cliArgumentsIds.join('=something ')}`)
  process.exit(1)
}

const url = urlArg.replace(`${urlId}=`, '')
const method = methodArg.replace(`${methodId}=`, '')
const params = paramsArg ? JSON.parse(paramsArg.replace(`${paramsId}=`, '')) : {}

fetch(url, { method: 'post', body: JSON.stringify({ method, params }) })
  .then(response => response.json())
  .then(console.log)
  .catch(console.error)
