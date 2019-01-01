import { LaneType, Application } from '@fivethree/billy-core';
export default class CorePlugin {
    print(text: string): void;
    wait(dur: number): Promise<{}>;
    run(app: Application, ...lanes: LaneType[]): Promise<void>;
    parseJSON(pathToJSON: any): any;
    write(path: any, content: any): void;
    prompt(args: any[] | string): Promise<any>;
    exists(path: string): boolean;
    exec(command: string): Promise<any>;
    isBilly(): boolean;
    gitClean(path?: any): Promise<boolean>;
}
