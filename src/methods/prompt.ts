import inquirer from 'inquirer';
import isValidFilename from 'valid-filename';

import { type Entries } from '../utils/object.js';
import {
  dependencies as allDependencies, type DependenciesNames, type RepoHostsNames,
} from '../classes/Store.js';
import { type IApp } from '../classes/App.js';

const commonNames = ['name', 'title', 'description'] as const;
const contactsNames = ['name', 'job', 'email', 'telegram', 'website'] as const;
const infoNames = ['copyright'] as const;

export type PromptTypes = 'input' | 'confirm' | 'checkbox' | 'list' | 'rawlist' | 'expand' | 'password' | 'editor';
export type PromptWhen = (answers: any) => boolean;
export type PromptValidate = (answers: any) => boolean | string;

export type PromptQuestions = Record<keyof IAnswers, IPrompt[]>;

export interface IPromptChoices {
  name: string;
  value: boolean | string;
  short?: string;
  checked?: boolean;
}

export interface IPrompt {
  name: string;
  message: string;
  type?: PromptTypes;
  choices?: IPromptChoices[];
  default?: boolean | string | string[];
  validate?: PromptValidate;
  when?: boolean | PromptWhen;
}

export interface IAnswersContinue {
  continue: boolean;
}

export interface IAnswersCommon {
  name: string;
  title: string;
  description: string;
}

export type AnswersRepo = {
  host: RepoHostsNames;
  owner: string;
} & IAnswersContinue;

export type AnswersContacts = {
  [key in typeof contactsNames[number]]: string;
} & IAnswersContinue;

export type AnswersInfo = {
  [key in typeof infoNames[number]]: string;
} & IAnswersContinue;

export interface AnswersDependencies extends IAnswersContinue {
  select: boolean;
  custom: DependenciesNames[];
}

export interface IAnswersBoilerplate {
  boilerplate: boolean;
}

export interface IAnswers {
  common: IAnswersCommon;
  repo: AnswersRepo;
  contacts: AnswersContacts;
  info: AnswersInfo;
  dependencies: AnswersDependencies;
  boilerplate: IAnswersBoilerplate;
}

export type PromptMethod = (isConfig?: boolean) => Promise<void>;

export default (async function (this: IApp, isConfig = false) {
  const shouldContinue = (answers: any, ...checks: boolean[]) => checks.reduce((acc, check) => acc && check, answers.continue && !this.args.force);

  const validateName = (name: string) => isValidFilename(name) || this.text('FOLDER_NAME_ERROR', 'bold', 'red');
  const validateNonEmpty = (value: string) => !!value || this.text('EMPTY_VALUE_ERROR', 'bold', 'red');

  const getConfirm = (name: string): IPrompt => ({
    name: 'continue',
    type: 'confirm',
    message: this.text(`PROMPT_${name.toUpperCase()}_CONTINUE`),
    default: false,
    when: !this.args.force,
  });

  const common: IPrompt[] = commonNames.map((name) => ({
    name,
    message: this.text(`PROMPT_COMMON_${name.toUpperCase()}`),
    when: !isConfig && (name === 'name' ? !this.params.common.name : true),
    validate: (value: string) => {
      if (name === 'name') {
        return validateName(value);
      }

      if (name === 'title') {
        return validateNonEmpty(value);
      }

      return true;
    },
  }));

  const repo: IPrompt[] = [
    getConfirm('repo'),
    {
      name: 'host',
      type: 'list',
      message: this.text('PROMPT_REPO_HOST'),
      default: this.storedParams.repo.host || this.text('PROMPT_REPO_HOST_DEFAULT'),
      choices: this.repoHosts.map((value) => ({
        name: this.text(`PROMPT_REPO_HOST_${value.toUpperCase()}`),
        value,
      })),
      when: shouldContinue,
    },
    {
      name: 'owner',
      message: this.text('PROMPT_REPO_OWNER'),
      default: this.storedParams.repo.owner || '',
      when: shouldContinue,
    }];

  const contacts: IPrompt[] = [
    getConfirm('contacts'),
    ...contactsNames.map((name) => ({
      name,
      message: this.text(`PROMPT_CONTACTS_${name.toUpperCase()}`),
      default: this.storedParams.contacts[name] || this.text(`PROMPT_CONTACTS_${name.toUpperCase()}_DEFAULT`),
      when: shouldContinue,
    }) as IPrompt)];

  const info: IPrompt[] = [
    getConfirm('info'),
    ...infoNames.map((name) => ({
      name,
      message: this.text(`PROMPT_INFO_${name.toUpperCase()}`),
      default: this.storedParams.info[name] || '',
      when: shouldContinue,
    }) as IPrompt),
  ];

  const dependencies: IPrompt[] = [
    getConfirm('dependencies'), {
      name: 'select',
      type: 'list',
      default: this.storedParams.dependencies.length !== this.dependencies.length,
      message: this.text('PROMPT_DEPENDENCIES_SELECT'),
      choices: [{
        name: this.text('PROMPT_DEPENDENCIES_ALL'),
        short: this.text('PROMPT_DEPENDENCIES_ALL_SHORT'),
        value: false,
      }, {
        name: this.text('PROMPT_DEPENDENCIES_CHOOSE'),
        short: this.text('PROMPT_DEPENDENCIES_CHOOSE_SHORT'),
        value: true,
      }],
      when: shouldContinue,
    },
    {
      name: 'custom',
      type: 'checkbox',
      message: this.text('PROMPT_DEPENDENCIES_CUSTOM'),
      default: [],
      choices: this.dependencies.map((value) => ({
        name: this.text(`PROMPT_DEPENDENCIES_${value.toUpperCase()}`),
        short: this.text(`PROMPT_DEPENDENCIES_${value.toUpperCase()}_SHORT`),
        checked: this.storedParams.dependencies.includes(value),
        value,
      })),
      when: (answers: any) => shouldContinue(answers, answers.select),
    }];

  const boilerplate: IPrompt[] = [{
    name: 'boilerplate',
    type: 'confirm',
    message: this.text('PROMPT_BOILERPLATE'),
    default: false,
    when: isConfig || !this.args.force,
  }];

  const questions = {
    common,
    repo,
    contacts,
    info,
    dependencies,
    boilerplate,
  };

  const answers = {} as IAnswers;

  for (const [key, prompts] of (Object.entries(questions) as Entries<PromptQuestions>)) {
    answers[key] = await inquirer.prompt(prompts);
  }

  (Object.entries(answers) as Entries<IAnswers>).forEach(([key, values]) => {
    if (key === 'common') {
      (Object.entries(values) as Entries<IAnswersCommon>).forEach(([nestedKey, value]) => {
        if ((nestedKey === 'name' && value) || nestedKey !== 'name') {
          this.params[key][nestedKey] = value;
        }
      });
    } else if (key === 'boilerplate') {
      this.params[key] = values[key] || this.storedParams[key];
    } else if (key === 'dependencies') {
      if (values.continue) {
        this.params[key] = values.select ? values.custom : [...allDependencies];
      } else {
        this.params[key] = this.storedParams[key];
      }
    } else if (values.continue) {
      (this.params[key] as any) = (Object.keys(values) as (keyof typeof values)[]).reduce((acc, key) => {
        if (key !== 'continue') {
          acc[key] = values[key];
        }

        return acc;
      }, {});
    } else {
      (this.params[key] as any) = this.storedParams[key];
    }
  });
}) as PromptMethod;
