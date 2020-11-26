SM-CLI
===============

Secrets manager for sharing environment variables

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/secrets-manager.svg)](https://npmjs.org/package/sm-cli)
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
$ npm install -g @appnroll/sm-cli
$ sm-cli COMMAND
running command...
$ sm-cli (-v|--version|version)
@appnroll/sm-cli/0.0.1 darwin-x64 node-v13.8.0
$ sm-cli --help [COMMAND]
USAGE
  $ sm-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sm-cli add`](#sm-cli-add)
* [`sm-cli display`](#sm-cli-display)
* [`sm-cli fetch`](#sm-cli-fetch)
* [`sm-cli help [COMMAND]`](#sm-cli-help-command)
* [`sm-cli init`](#sm-cli-init)
* [`sm-cli remove`](#sm-cli-remove)
* [`sm-cli sync`](#sm-cli-sync)
* [`sm-cli update`](#sm-cli-update)

## `sm-cli add`

This command used to adding new variable to .env file

```
USAGE
  $ sm-cli add

OPTIONS
  -h, --help         show CLI help
  -k, --key=key      variable key
  -v, --value=value  variable value

EXAMPLES
  $ sm-cli add
  $ sm-cli add -k VARIABLE_KEY -v VARIABLE_VALUE
```

_See code: [src/commands/add.ts](https://github.com/appnroll/secrets-manager/blob/v0.0.1/src/commands/add.ts)_

## `sm-cli display`

This command used to displaying variables list from .env file

```
USAGE
  $ sm-cli display

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ sm-cli display
```

_See code: [src/commands/display.ts](https://github.com/appnroll/secrets-manager/blob/v0.0.1/src/commands/display.ts)_

## `sm-cli fetch`

This command used to fetch the secrets manager data and save it into .env file

```
USAGE
  $ sm-cli fetch

OPTIONS
  -h, --help             show CLI help
  -p, --profile=profile  AWS profile name

EXAMPLES
  $ sm-cli fetch
  $ sm-cli fetch -p PROFILE_NAME
```

_See code: [src/commands/fetch.ts](https://github.com/appnroll/secrets-manager/blob/v0.0.1/src/commands/fetch.ts)_

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

## `sm-cli init`

This command used to init the secrets manager in root directory of the project

```
USAGE
  $ sm-cli init

OPTIONS
  -h, --help             show CLI help
  -p, --project=project  Project secrets name
  -r, --region=region    Secrets manager region

EXAMPLES
  $ sm-cli init
  $ sm-cli init -p PROJECT_NAME -r SECRETS_MANAGER_REGION
```

_See code: [src/commands/init.ts](https://github.com/appnroll/secrets-manager/blob/v0.0.1/src/commands/init.ts)_

## `sm-cli remove`

This command used to removing new variable from .env file

```
USAGE
  $ sm-cli remove

OPTIONS
  -h, --help     show CLI help
  -k, --key=key  variable key

EXAMPLES
  $ sm-cli remove
  $ sm-cli remove -k VARIABLE_KEY
```

_See code: [src/commands/remove.ts](https://github.com/appnroll/secrets-manager/blob/v0.0.1/src/commands/remove.ts)_

## `sm-cli sync`

This command used to sync variable from local environment with AWS SecretsManager

```
USAGE
  $ sm-cli sync

OPTIONS
  -h, --help             show CLI help
  -p, --profile=profile  AWS profile name

EXAMPLES
  $ sm-cli fetch
  $ sm-cli fetch -p PROFILE_NAME
```

_See code: [src/commands/sync.ts](https://github.com/appnroll/secrets-manager/blob/v0.0.1/src/commands/sync.ts)_

## `sm-cli update`

This command used to update existing variable in .env file

```
USAGE
  $ sm-cli update

OPTIONS
  -h, --help         show CLI help
  -k, --key=key      variable key
  -v, --value=value  variable value

EXAMPLES
  $ sm-cli update
  $ sm-cli update -k VARIABLE_KEY -v VARIABLE_VALUE
```

_See code: [src/commands/update.ts](https://github.com/appnroll/secrets-manager/blob/v0.0.1/src/commands/update.ts)_
<!-- commandsstop -->
