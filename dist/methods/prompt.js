var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from 'inquirer';
import isValidFilename from 'valid-filename';
import { dependencies as allDependencies, } from '../classes/Store.js';
const commonNames = ['name', 'title', 'description'];
const contactsNames = ['name', 'job', 'email', 'telegram', 'website'];
const infoNames = ['copyright'];
export default (function (isConfig = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const shouldContinue = (answers, ...checks) => checks.reduce((acc, check) => acc && check, answers.continue && !this.args.force);
        const validateName = (name) => isValidFilename(name) || this.text('FOLDER_NAME_ERROR', 'bold', 'red');
        const validateNonEmpty = (value) => !!value || this.text('EMPTY_VALUE_ERROR', 'bold', 'red');
        const getConfirm = (name) => ({
            name: 'continue',
            type: 'confirm',
            message: this.text(`PROMPT_${name.toUpperCase()}_CONTINUE`),
            default: false,
            when: !this.args.force,
        });
        const common = commonNames.map((name) => ({
            name,
            message: this.text(`PROMPT_COMMON_${name.toUpperCase()}`),
            when: !isConfig && (name === 'name' ? !this.params.common.name : true),
            validate: (value) => {
                if (name === 'name') {
                    return validateName(value);
                }
                if (name === 'title') {
                    return validateNonEmpty(value);
                }
                return true;
            },
        }));
        const repo = [
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
            }
        ];
        const contacts = [
            getConfirm('contacts'),
            ...contactsNames.map((name) => ({
                name,
                message: this.text(`PROMPT_CONTACTS_${name.toUpperCase()}`),
                default: this.storedParams.contacts[name] || this.text(`PROMPT_CONTACTS_${name.toUpperCase()}_DEFAULT`),
                when: shouldContinue,
            }))
        ];
        const info = [
            getConfirm('info'),
            ...infoNames.map((name) => ({
                name,
                message: this.text(`PROMPT_INFO_${name.toUpperCase()}`),
                default: this.storedParams.info[name] || '',
                when: shouldContinue,
            })),
        ];
        const dependencies = [
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
                when: (answers) => shouldContinue(answers, answers.select),
            }
        ];
        const boilerplate = [{
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
        const answers = {};
        for (const [key, prompts] of Object.entries(questions)) {
            answers[key] = yield inquirer.prompt(prompts);
        }
        Object.entries(answers).forEach(([key, values]) => {
            if (key === 'common') {
                Object.entries(values).forEach(([nestedKey, value]) => {
                    if ((nestedKey === 'name' && value) || nestedKey !== 'name') {
                        this.params[key][nestedKey] = value;
                    }
                });
            }
            else if (key === 'boilerplate') {
                this.params[key] = values[key] || this.storedParams[key];
            }
            else if (key === 'dependencies') {
                if (values.continue) {
                    this.params[key] = values.select ? values.custom : [...allDependencies];
                }
                else {
                    this.params[key] = this.storedParams[key];
                }
            }
            else if (values.continue) {
                this.params[key] = Object.keys(values).reduce((acc, key) => {
                    if (key !== 'continue') {
                        acc[key] = values[key];
                    }
                    return acc;
                }, {});
            }
            else {
                this.params[key] = this.storedParams[key];
            }
        });
    });
});
