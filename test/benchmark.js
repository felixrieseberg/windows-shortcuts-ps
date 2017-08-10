const perfy = require('perfy')
const getPath = require('../lib/index').getPath

const iterations = process.argv[2] || 20

async function measureTimeIndividual () {
  perfy.start('this')
  for (let i = 0; i < iterations; i++) {
    await getPath('./Brave.lnk')
  }

  return perfy.end('this').time
}

async function measureTimeArray () {
  const paths = []

  for (let i = 0; i < iterations; i++) {
    paths.push('./Brave.lnk')
  }

  perfy.start('this')
  await getPath(paths)
  return perfy.end('this').time
}

async function test () {
  console.log(`Reading lnk file ${iterations} times. Standby.`)

  const arrayTime = await measureTimeArray()
  const individualTime = await measureTimeIndividual()

  console.log(`Called individually, once per path: ${individualTime}`)
  console.log(`Called with an array as parameter:  ${arrayTime} `)
}

test().then(() => {})
