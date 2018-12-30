import { LaneType, Application } from '@fivethree/billy-core';
declare class ExamplePlugin {
    print(text: string): void;
    timeout(dur: number): Promise<{}>;
    lane(app: Application, ...lanes: LaneType[]): Promise<void>;
}
declare const _default: ExamplePlugin;
export default _default;
