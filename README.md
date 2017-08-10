## windows-shortcuts-ps
Easily check the actual path for a Windows shortcut (aka a `lnk` file).
```
npm install windows-shortcut-ps
```

```js
const { getPath } = require('windows-shortcut-ps`)

getPath('./my-shortcut.lnk').then((actualPath) => console.log(actualPath))
```

If you need to get the actual path of multiple lnk files, call getPath with an array as parameter.
This module uses Node's `exec` under the hood, which is pretty slow to fire up. If you have twenty
files to check, calling the method with an array will take ~0.5 seconds, while calling the method
twenty times will take 14 seconds.


```js
const { getPath } = require('windows-shortcut-ps`)

const linkPaths = [ './sc1.lnk', './sc2.lnl' ]

getPath('./my-shortcut.lnk').then((actualPaths) => {
  linkPaths.forEach((shortcutPath, i) => {
    console.log(`The real path for ${shortcutPath} is ${actualpaths[i]})
  })
})
```

#### License
MIT, please see LICENSE for details. Copyright (c) 2017 Felix Rieseberg.
