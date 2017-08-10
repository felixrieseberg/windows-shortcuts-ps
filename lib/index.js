const exec = require('child_process').exec
const path = require('path')

function getCommand (lnkFile) {
  const normalizedFile = path.normalize(path.resolve(lnkFile))
  const getCOM = `(New-Object -COM WScript.Shell)`

  return `${getCOM}.CreateShortcut('${normalizedFile}').TargetPath;`
}

function getPath (lnkFile = '') {
  return new Promise((resolve, reject) => {
    let commands = []

    if (process.platform !== 'win32') {
      return reject(new Error('Platform is not Windows'))
    }

    if (Array.isArray(lnkFile)) {
      for (const lnk of lnkFile) {
        commands.push(getCommand(lnk))
      }
    } else if (typeof lnkFile === 'string') {
      commands.push(getCommand(lnkFile))
    } else {
      console.log(typeof lnkFile)
      return reject(new Error('Input is neither string nor array!'))
    }

    exec(`powershell.exe -command "${commands.join('')}"`, (err, stdout) => {
      if (err) {
        return reject(err)
      }

      const result = stdout.split('\r\n').filter((v) => !!v)

      if (result.length === 1) {
        resolve(result[0])
      } else if (result.length === 0) {
        resolve(null)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = { getPath }
