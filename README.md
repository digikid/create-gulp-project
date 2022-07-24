<div align="center">
  <img alt="Create Gulp Project" src="https://github.com/digikid/create-gulp-project/raw/main/logo.png" height="117" />
  <h1>Create Gulp Project</h1>
  <p>Configure projects based on <a href="https://github.com/digikid/gulp-project">gulp-project</a> boilerplate.<br>Store your settings and setup new projects quickly.</p>
  <p>
    <b>English</b> | <a href="https://github.com/digikid/create-gulp-project/blob/main/README.ru-RU.md">Русский</a></p>
  <img src="https://img.shields.io/github/release/digikid/create-gulp-project.svg?style=flat-square&logo=appveyor" alt="Release version">
  <img src="https://img.shields.io/github/languages/top/digikid/create-gulp-project.svg?style=flat-square&logo=appveyor" alt="TypeScript">
  <img src="https://img.shields.io/github/license/digikid/create-gulp-project.svg?style=flat-square&logo=appveyor" alt="MIT License">
</div>

## Install

```shell
npm i -g digikid/create-gulp-project
```

## Run

Navigate to directory where you want to create project and run the command:

```shell
create-gulp-project
```

Through the command line, you can set project folder name:

```shell
create-gulp-project my-project
```

## Usage

Before creating a new project you are prompted to complete a survey with a full list of params. Most of these are optional and do not change from project to project (for example, your contact information).

You can [save optional params](#config), after which they will be applied to all created projects if the `-f` flag is passed:

```shell
create-gulp-project my-project -f
```

## Options

| Option             | Description                  |
|--------------------|------------------------------|
| <b>-f, --force</b> | Skip filling optional params |

## Commands

| Command        | Description                   |
|----------------|-------------------------------|
| <b>config</b>  | Update optional params        |
| <b>help</b>    | Display usage guide           |
| <b>restore</b> | Restore default params        |
| <b>version</b> | Print current package version |

<a name="config"></a>

### Update optional params

To save optional params, use `config` command and take the survey:

```shell
create-gulp-project config
```

For restore to default params, run `restore` command:

```shell
create-gulp-project restore
```

### Help

The `help` command displays a help section with a list of available options and commands list:

```shell
create-gulp-project help
```

### Version

You can check installed package version with `version` command:

```shell
create-gulp-project version
```

## License

[The MIT License (MIT)](LICENSE)
