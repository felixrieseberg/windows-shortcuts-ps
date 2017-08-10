const assert = require('assert')
const path = require('path')
const getPath = require('../lib/index').getPath

async function test () {
  const p = await getPath(path.join(__dirname, 'Brave.lnk'))

  assert.strictEqual(p, 'C:\\Users\\felixr\\AppData\\Local\\brave\\Brave.exe')

  console.log('All done!')
}

test()
