secrets-manager
===============

Secrets manager for sharing environment variables

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/secrets-manager.svg)](https://npmjs.org/package/secrets-manager)
[![CircleCI](https://circleci.com/gh/igorbezsmertnyi/secrets-manager/tree/master.svg?style=shield)](https://circleci.com/gh/igorbezsmertnyi/secrets-manager/tree/master)
[![Codecov](https://codecov.io/gh/igorbezsmertnyi/secrets-manager/branch/master/graph/badge.svg)](https://codecov.io/gh/igorbezsmertnyi/secrets-manager)
[![Downloads/week](https://img.shields.io/npm/dw/secrets-manager.svg)](https://npmjs.org/package/secrets-manager)
[![License](https://img.shields.io/npm/l/secrets-manager.svg)](https://github.com/igorbezsmertnyi/secrets-manager/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g secrets-manager
$ sm-cli COMMAND
running command...
$ sm-cli (-v|--version|version)
secrets-manager/0.0.1 darwin-x64 node-v13.7.0
$ sm-cli --help [COMMAND]
USAGE
  $ sm-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sm-cli hello [FILE]`](#sm-cli-hello-file)
* [`sm-cli help [COMMAND]`](#sm-cli-help-command)

## `sm-cli hello [FILE]`

describe the command here

```
USAGE
  $ sm-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ sm-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/igorbezsmertnyi/secrets-manager/blob/v0.0.1/src/commands/hello.ts)_

## `sm-cli help [COMMAND]`

display help for sm-cli

```
USAGE
  $ sm-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
