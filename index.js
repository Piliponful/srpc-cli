import fetch from 'node-fetch'

const srpcArguments = process.argv.slice(2)

const cliName = 'srpc'

const urlId = '--url'
const functionNameId = '--functionName'
const functionArgumentsId = '--functionArguments'

const cliArgumentsIds = [urlId, functionNameId, functionArgumentsId]

const urlArg = srpcArguments.find(arg => arg.includes(urlId))
const functionNameArg = srpcArguments.find(arg => arg.includes(functionNameId))
const functionArgumentsArg = srpcArguments.find(arg => arg.includes(functionArgumentsId))

if (!urlArg || !functionNameArg || !functionArgumentsArg) {
  console.log(`Usage: ${cliName} ${cliArgumentsIds.join('=something ')}`)
  process.exit(1)
}

const url = urlArg.replace(`${urlId}=`, '')
const functionName = functionNameArg.replace(`${functionNameId}=`, '')
const functionArguments = JSON.parse(functionArgumentsArg.replace(`${functionArgumentsId}=`, ''))

console.log(url, functionName, functionArguments)

fetch(url, { method: 'post', body: JSON.stringify({ functionName, functionArguments }) })
  .then(response => response.json())
  .then(console.log)
  .catch(console.error)
