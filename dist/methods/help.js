var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import commandLineUsage from 'command-line-usage';
export default (function () {
    return __awaiter(this, void 0, void 0, function* () {
        const sections = [
            {
                header: `${this.text('HELP_NAME')} ${this.packageJson.version}`,
                content: this.text('HELP_DESCRIPTION'),
            },
            {
                header: this.text('HELP_SYNOPSIS_TITLE'),
                content: [
                    `$ ${this.packageJson.name} <name> <options>`,
                    `$ ${this.packageJson.name} <command>`,
                    `$ ${this.packageJson.name} {underline my-project}`,
                    `$ ${this.packageJson.name} {underline my-project} {bold -f}`,
                ],
            }, {
                header: this.text('HELP_OPTIONS_TITLE'),
                optionList: [
                    {
                        name: 'force',
                        alias: 'f',
                        type: Boolean,
                        description: this.text('HELP_OPTIONS_FORCE_TEXT'),
                    },
                ],
            },
            {
                header: this.text('HELP_COMMANDS_TITLE'),
                content: [
                    { name: 'config', summary: this.text('HELP_COMMANDS_CONFIG_TEXT') },
                    { name: 'help', summary: this.text('HELP_COMMANDS_HELP_TEXT') },
                    { name: 'restore', summary: this.text('HELP_COMMANDS_RESTORE_TEXT') },
                    { name: 'version', summary: this.text('HELP_COMMANDS_VERSION_TEXT') },
                ],
            },
            {
                header: this.text('HELP_MORE_TITLE'),
                content: `${this.text('HELP_MORE_TEXT')} {underline ${this.packageJson.homepage}}`,
            },
        ];
        const usage = yield commandLineUsage(sections);
        this.log.print(usage);
    });
});
