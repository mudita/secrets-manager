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
$ npm install -g sm-cli
$ sm-cli COMMAND
running command...
$ sm-cli (-v|--version|version)
sm-cli/0.0.1 darwin-x64 node-v13.7.0
$ sm-cli --help [COMMAND]
USAGE
  $ sm-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sm-cli init`](#sm-cli-init)
* [`sm-cli fetch`](#sm-cli-fetch)
* [`sm-cli display`](#sm-cli-display)
* [`sm-cli add`](#sm-cli-add)
* [`sm-cli update`](#sm-cli-update)
* [`sm-cli sync`](#sm-cli-sync)
* [`sm-cli help [COMMAND]`](#sm-cli-help-command)

## `sm-cli init`

This command used to init the secrets manager in root directory of the project

```
USAGE
  $ sm-cli init
  $ sm-cli init -p project_name -r secrets_manager_region

OPTIONS
  -h, --help           show CLI help
  -p, --project=value  AWS secrets manager name
  -r, --region=value   AWS secrets manager region

EXAMPLE
  $ sm-cli init
  Enter project name: project_name
  Enter secrets manager region: secrets_manager_region
  $ secrets manager successfully initialized

  or

  $ sm-cli init -p project_name -r secrets_manager_region
  $ secrets manager successfully initialized
```

_See code: [src/commands/init.ts](/src/commands/init.ts)_

## `sm-cli fetch`

This command used to fetch the secrets manager data and save it into .env file

```
USAGE
  $ sm-cli fetch
  $ sm-cli fetch -p profile_name

OPTIONS
  -h, --help           show CLI help
  -p, --profile=value  AWS credentials profile

EXAMPLE
  $ sm-cli fetch
  $ env's successfully fetched

  or

  $ sm-cli fetch -p profile_name
  $ env's successfully fetched
```

_See code: [src/commands/fetch.ts](/src/commands/fetch.ts)_

## `sm-cli display`

This command used to displaying variables list from .env file

```
USAGE
  $ sm-cli display

OPTIONS
  -h, --help           show CLI help

EXAMPLE
  $ sm-cli display
  KEY          VALUE
  VARIABLE_KEY VARIABLE_VALUE

```

_See code: [src/commands/display.ts](/src/commands/display.ts)_

## `sm-cli add`

This command used to adding new variant to .env file

```
USAGE
  $ sm-cli add
  $ sm-cli add -k variable_key -v variable_value

OPTIONS
  -h, --help           show CLI help
  -k, --key            variable name
  -v, --value          variable value

EXAMPLE
  $ sm-cli add
  Enter variable key: variable_key
  Enter variable value: variable_value
  variable: variable_key successfully added

  or

  $ sm-cli add -k variable_key -v variable_value
  variable: variable_key successfully added
```

## `sm-cli update`

This command used to update existing variant in .env file

```
USAGE
  $ sm-cli update
  $ sm-cli update -k variable_key -v variable_value

OPTIONS
  -h, --help           show CLI help
  -k, --key            variable name
  -v, --value          variable value

EXAMPLE
  $ sm-cli update
  Enter variable key: variable_key
  Enter variable value: variable_value
  variable: variable_key successfully added

  or

  $ sm-cli update -k variable_key -v variable_value
  variable: variable_key successfully updated
```

_See code: [src/commands/update.ts](/src/commands/update.ts)_

## `sm-cli sync`

This command used to sync variable from local environment with AWS SecretsManager

```
USAGE
  $ sm-cli sync
  $ sm-cli sync -p profile_name

OPTIONS
  -h, --help           show CLI help
  -p, --profile        AWS credentials profile

EXAMPLE
  $ sm-cli sync
  env's successfully synced

  or

  $ sm-cli sync -p profile_name
  env's successfully synced
```

_See code: [src/commands/sync.ts](/src/commands/sync.ts)_

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
