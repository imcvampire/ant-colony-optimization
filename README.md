IT4040-AI
=========

A project from class IT4040 in HUST

Install Package Dependencies
----------------------------

```bash
npm i
```

Folder structure
----------------

```file-system
+ \dist 
+ \report
  + \src
    - report.md
    - slides.md
    
+ \src
  + \aco
    - ant.js
    - colony.js
  + \demo
    - demo.js
  + \perm
    - permutation.js
  + \problem
    - tsp.js
  - helpers.js
  - index.html
  - index.js

- package.json
- README.md
- express.js
- webpack.config.js 
...
```

Scripts
-------

```json
\\ package.json

{
  ...
  "scripts": {
    "start": "start dist/index.html",
    "server": "node express.js",
    "build": "webpack"
  },
  ...
}
```