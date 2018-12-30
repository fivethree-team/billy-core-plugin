import { Plugin, Action, LaneType, Application } from '@fivethree/billy-core';
@Plugin('billy-plugin-example')
class ExamplePlugin {

    @Action('print')
    print(text: string) {
        console.log(text);
    }

    @Action('timeout')
    async timeout(dur: number) {
        console.log(`wait for ${dur}ms!`)
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('done waiting');
                resolve();
            }, dur);
        })
    }

    @Action('lane')
    async lane(app: Application, ...lanes: LaneType[]) {
        await app.takeMultiple(lanes);
    }

}

export default new ExamplePlugin();
