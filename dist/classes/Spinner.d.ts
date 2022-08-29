import { type Ora } from 'ora';
import { type SpinnerName } from 'cli-spinners';
export interface ISpinner {
    readonly text: string;
    readonly name: SpinnerName;
    readonly spinner: Ora;
    readonly success: (text: string) => void;
    readonly error: (text: string, e: unknown) => void;
}
export default class Spinner {
    text: string;
    name: SpinnerName;
    constructor(text: string, name?: SpinnerName);
    spinner: Ora;
    success(text: string): void;
    error(text: string, e: unknown): void;
}
//# sourceMappingURL=Spinner.d.ts.map