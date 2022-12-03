[![Build Status](https://github.com/cdcabrera/magic-pages-work/workflows/Build/badge.svg?branch=main)](https://github.com/cdcabrera/magic-pages-work/actions?query=workflow%3ABuild)
[![codecov](https://codecov.io/gh/cdcabrera/magic-pages-work/branch/main/graph/badge.svg)](https://codecov.io/gh/cdcabrera/magic-pages-work)
[![License](https://img.shields.io/github/license/cdcabrera/magic-pages-work.svg)](https://github.com/cdcabrera/magic-pages-work/blob/main/LICENSE)

# Magic Pages Work
CLI continuation of [swagger-mock-api](https://github.com/dzdrazil/swagger-mock-api). Generate an API based on a Swagger compatible YAML or JSON file.

## Requirements
The basic requirements:
* [NodeJS version 14+](https://nodejs.org/)
* Optionally your system could be running
  - [Yarn 1.22+](https://yarnpkg.com), otherwise NPM should be adequate.

## Use

### CLI

NPM install package [magic-pages-work](https://www.npmjs.com/~cdcabrera)

  ```shell
    $ npm i magic-pages-work
  ```

or Yarn

  ```shell
    $ yarn add magic-pages-work
  ```

#### Usage
```
  $ mock --help
  Generate an API based on a Swagger compatible YAML or JSON file.
  
  Usage: mock [options]
  
  Options:
    -h, --help          Show help                                        [boolean]
    -v, --version       Show version number                              [boolean]
```

### Using within a project
Using `magic-pages-work` within a project requires one primary thing... having a Swagger YAML or JSON spec.

#### Example NPM script
For a basic use within a project you could apply `magic-pages-work` as a NPM script in `package.json`

   ```js
     "scripts": {
       "api:dev": "mock -p 5000 [PATH TO YOUR SWAGGER YAML OR JSON]"
     }
   ```

We also expose our parser for reasons you make up...

```js
     "scripts": {
       "parse": "mock --parse=[PATH TO YOUR SWAGGER YAML] --output=[PATH FOR JSON FILE OUTPUT]"
     }
   ```

## Credit
This project is a CLI continuation of [swagger-mock-api](https://github.com/dzdrazil/swagger-mock-api).

## Contributing
Contributing? Guidelines can be found here [CONTRIBUTING.md](./CONTRIBUTING.md).
