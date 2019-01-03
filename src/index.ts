import { Plugin, Action } from '@fivethree/billy-core';
import { existsSync, readFileSync, writeFileSync } from 'fs';
const path = require('path');
const { prompt } = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

@Plugin('billy-plugin-core')
export default class CorePlugin {

    @Action('print in console')
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

    @Action('parseJSON')
    parseJSON(pathToJSON) {
        if (existsSync(pathToJSON)) {
            return JSON.parse(readFileSync(pathToJSON, 'utf8'));
        } else {
            throw new Error(`Couldn't find file at path: ${pathToJSON}.`);
        }
    }

    @Action('writeJSON')
    writeJSON(path, content) {
        if (existsSync(path)) {
            return writeFileSync(path, JSON.stringify(content, null, 4));
        } else {
            throw new Error(`File doesn't exists: ${path}.`);
        }
    }

    @Action('read file from disk')
    readText(pathToFile: string) {
        if (existsSync(pathToFile)) {
            return readFileSync(pathToFile, 'utf8');
        } else {
            throw new Error(`Couldn't find file at path: ${pathToFile}.`);
        }
    }

    @Action('write file to disk')
    writeText(pathToFile, content) {
        if (existsSync(pathToFile)) {
            return writeFileSync(pathToFile, content);
        } else {
            throw new Error(`File doesn't exists: ${pathToFile}.`);
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

    @Action('billy')
    billy(): boolean {
        return existsSync('./node_modules/@fivethree/billy-core');
    }

    @Action('gitClean')
    async gitClean(path?: string): Promise<boolean> {
        const status = path ? await exec(`git --git-dir=${path}/.git --work-tree=${path} status --porcelain`) : await exec('git status --porcelain ');
        return status.stdout.length === 0 && status.stderr.length === 0;
    }

    @Action('bump')
    async bump(version: string, message: string, path?: string) {
        let m = `bump(${version})`;
        m = message ? m + ': ' + message : m;
        return path ? await exec(`git --git-dir=${path}/.git --work-tree=${path} add -A && git --git-dir=${path}/.git --work-tree=${path} commit -m "${m}"`) : await exec(`git add -A && git commit -m "${m}"`);
    }

    @Action('push_to_remote')
    async push(path?: string, remote?: string, localBranch?: string, remoteBranch?: string) {
        const r = remote || 'origin';
        const curB = (await exec(`git --git-dir=${path}/.git --work-tree=${path} rev-parse --symbolic-full-name --abbrev-ref HEAD`)).stdout.replace('\n', '');
        const lB = localBranch || curB;
        const rB = remoteBranch || lB;
        return path ? await exec(`git --git-dir=${path}/.git --work-tree=${path} push ${r} "${lB}:${rB}"`) : await exec(`git push ${r} "${lB}:${rB}"`);
    }

}
