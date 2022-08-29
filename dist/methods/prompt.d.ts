import { type DependenciesNames, type RepoHostsNames } from '../classes/Store.js';
declare const contactsNames: readonly ["name", "job", "email", "telegram", "website"];
declare const infoNames: readonly ["copyright"];
export declare type PromptTypes = 'input' | 'confirm' | 'checkbox' | 'list' | 'rawlist' | 'expand' | 'password' | 'editor';
export declare type PromptWhen = (answers: any) => boolean;
export declare type PromptValidate = (answers: any) => boolean | string;
export declare type PromptQuestions = Record<keyof IAnswers, IPrompt[]>;
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
export declare type AnswersRepo = {
    host: RepoHostsNames;
    owner: string;
} & IAnswersContinue;
export declare type AnswersContacts = {
    [key in typeof contactsNames[number]]: string;
} & IAnswersContinue;
export declare type AnswersInfo = {
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
export declare type PromptMethod = (isConfig?: boolean) => Promise<void>;
declare const _default: PromptMethod;
export default _default;
//# sourceMappingURL=prompt.d.ts.map