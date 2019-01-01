import { Plugin, Action, LaneType, Application } from '@fivethree/billy-core';
import { existsSync, readFileSync, writeFileSync } from 'fs';
const path = require('path');
const { prompt } = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
@Plugin('billy-plugin-core')
export default class CorePlugin {

    @Action('print')
    print(text: string) {
        console.log(text);
    }

    @Action('wait')
    async wait(dur: number) {
        console.log(`wait for ${dur}ms!`)
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('done waiting');
                resolve();
            }, dur);
        })
    }

    @Action('run')
    async run(app: Application, ...lanes: LaneType[]) {
        await app.takeMultiple(lanes);
    }

    @Action('parseJSON')
    parseJSON(pathToJSON) {
        if (existsSync(pathToJSON)) {
            return JSON.parse(readFileSync(pathToJSON, 'utf8'));
        } else {
            throw new Error(`Couldn't find file at path: ${pathToJSON}.`);
        }
    }

    @Action('writeJSON')
    write(path, content) {
        if (existsSync(path)) {
            return writeFileSync(path, JSON.stringify(content, null, 4));
        } else {
            throw new Error(`File doesn't exists: ${path}.`);
        }
    }

    @Action('prompt')
    async prompt(args: any[] | string) {
        if (typeof args === 'string') {
            return (await prompt([
                {
                    name: 'answer',
                    message: args,
                }
            ])).answer;
        } else {
            return await prompt(...args);
        }
    }

    @Action('exists')
    exists(path: string): boolean {
        return existsSync(path);
    }

    @Action('exec')
    async exec(command: string) {
        return await exec(command);
    }

    @Action('isBilly')
    isBilly() {
        return existsSync('./node_modules/@fivethree/billy-core');
    }

    @Action('gitClean')
    async gitClean(path?) {
        const status = path ? await exec(`cd ${path} && git status --porcelain `) : await exec('git status --porcelain ');
        return status.stdout.length === 0 && status.stderr.length === 0;

    }

}
