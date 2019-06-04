import { Context } from '@fivethree/billy-core';
import { GitPlugin } from '@fivethree/billy-plugin-git';
export interface CorePlugin extends GitPlugin {
}
export declare class CorePlugin {
    print(...args: string[] | any[]): void;
    wait(dur: number): Promise<void>;
    parseJSON(path: string): any;
    writeJSON(path: string, content: any): void;
    readText(path: string): string;
    writeText(path: string, content: any): void;
    prompt(args: any[] | string): Promise<any>;
    exists(path: string): boolean;
    exec(command: string, printToConsole?: boolean): Promise<any>;
    billy(path?: string): boolean;
    colorize(color: string, input: string): string;
    bump(version: string, message: string, path?: string): Promise<any>;
    camelcase(s: string, pascalCase?: boolean): any;
    startJobs(context: Context): Promise<void>;
}
