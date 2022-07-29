<div align="center">
  <img alt="Create Gulp Project" src="https://github.com/digikid/create-gulp-project/raw/main/logo.svg" height="117" />
  <h1>Create Gulp Project</h1>
  <p>Конфигуратор для проектов на сборке <a href="https://github.com/digikid/gulp-project">gulp-project</a>.<br>Сохраняйте параметры и создавайте новые проекты за пару кликов.</p>
  <p>
    <a href="https://github.com/digikid/create-gulp-project/blob/main/README.md">English</a> | <b>Русский</b></p>
  <img src="https://img.shields.io/github/release/digikid/create-gulp-project.svg?style=flat-square&logo=appveyor" alt="Release version">
  <img src="https://img.shields.io/github/languages/top/digikid/create-gulp-project.svg?style=flat-square&logo=appveyor" alt="TypeScript">
  <img src="https://img.shields.io/github/license/digikid/create-gulp-project.svg?style=flat-square&logo=appveyor" alt="MIT License">
</div>

## Установка

```shell
npm i -g digikid/create-gulp-project
```

## Запуск

Для запуска перейдите в директорию, где нужно создать проект и запустите команду:

```shell
create-gulp-project
```

Через командную строку вы можете сразу задать имя папки с проектом:

```shell
create-gulp-project my-project
```

## Использование

По умолчанию перед созданием нового проекта вам предлагается пройти опрос с полным перечнем параметров. Большинство из них не являются обязательными и не изменяются от проекта к проекту (например, ваша контактная информация).

Вы можете предварительно [сохранить значения](#config) необязательных параметров, после чего они будут применяться ко всем созданным проектам, если передан флаг `-f`:

```shell
create-gulp-project my-project -f
```

## Параметры

| Параметр            | Описание                                        |
|---------------------|-------------------------------------------------|
| <b>-f, --force</b>  | Пропустить заполнение необязательных параметров |

## Команды

| Команда        | Описание                            |
|----------------|-------------------------------------|
| <b>config</b>  | Изменить параметры                  |
| <b>help</b>    | Показать раздел справки             |
| <b>restore</b> | Восстановить параметры по умолчанию |
| <b>version</b> | Показать текущую версию             |

<a name="config"></a>

### Изменение параметров

Для того чтобы сохранить значения необязательных параметров, воспользуйтесь командой `config` и пройдите опрос:

```shell
create-gulp-project config
```

Чтобы восстановить значения параметров по умолчанию, запустите команду `restore`:

```shell
create-gulp-project restore
```

### Раздел справки

Команда `help` отображает справочный раздел со списком доступных параметров и команд:

```shell
create-gulp-project help
```

### Текущая версия

Для просмотра текущей версии установленного пакета запустите команду `version`:

```shell
create-gulp-project version
```

## Лицензия

[The MIT License (MIT)](LICENSE)
