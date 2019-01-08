export declare class CorePlugin {
    print(...args: string[] | any[]): void;
    wait(dur: number): Promise<void>;
    parseJSON(path: string): any;
    writeJSON(path: string, content: any): void;
    readText(path: string): string;
    writeText(path: string, content: any): void;
    prompt(args: any[] | string): Promise<any>;
    exists(path: string): boolean;
    exec(command: string): Promise<any>;
    billy(): boolean;
    gitClean(path?: string): Promise<boolean>;
    bump(version: string, message: string, path?: string): Promise<any>;
    push(path?: string, remote?: string, localBranch?: string, remoteBranch?: string): Promise<any>;
}
