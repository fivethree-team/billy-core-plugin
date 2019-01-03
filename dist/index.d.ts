export default class CorePlugin {
    print(text: string): void;
    wait(dur: number): Promise<{}>;
    parseJSON(pathToJSON: any): any;
    writeJSON(path: any, content: any): void;
    readText(pathToFile: string): string;
    writeText(pathToFile: any, content: any): void;
    prompt(args: any[] | string): Promise<any>;
    exists(path: string): boolean;
    exec(command: string): Promise<any>;
    billy(): boolean;
    gitClean(path?: string): Promise<boolean>;
    bump(version: string, message: string, path?: string): Promise<any>;
    push(path?: string, remote?: string, localBranch?: string, remoteBranch?: string): Promise<any>;
}
