import { LaneType, Application } from '@fivethree/billy-core';
declare class CorePlugin {
    print(text: string): void;
    wait(dur: number): Promise<{}>;
    run(app: Application, ...lanes: LaneType[]): Promise<void>;
    parseJSON(pathToJSON: any): any;
    write(path: any, content: any): void;
    prompt(args: any[] | string): Promise<any>;
    exists(path: string): boolean;
    exec(command: string): Promise<any>;
    isBilly(): boolean;
}
declare const _default: CorePlugin;
export default _default;
