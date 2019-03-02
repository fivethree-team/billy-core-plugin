import { Plugin, Action } from '@fivethree/billy-core';
import { existsSync, readFileSync, writeFileSync } from 'fs';
const { prompt } = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const spawn = require('child_process').spawn;
const camelCase = require('camelcase');
@Plugin('billy-plugin-core')
export class CorePlugin {

    @Action('print in console')
    print(...args: string[] | any[]) {
        console.log(...args);
    }

    @Action('wait')
    async wait(dur: number): Promise<void> {
        console.log(`wait for ${dur}ms!`)
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('done waiting');
                resolve();
            }, dur);
        })
    }

    @Action('parseJSON')
    parseJSON(path: string) {
        if (existsSync(path)) {
            return JSON.parse(readFileSync(path, 'utf8'));
        } else {
            throw new Error(`Couldn't find file at path: ${path}.`);
        }
    }

    @Action('writeJSON')
    writeJSON(path: string, content: any) {
        if (existsSync(path)) {
            return writeFileSync(path, JSON.stringify(content, null, 4));
        } else {
            throw new Error(`File doesn't exists: ${path}.`);
        }
    }

    @Action('read file from disk')
    readText(path: string) {
        if (existsSync(path)) {
            return readFileSync(path, 'utf8');
        } else {
            throw new Error(`Couldn't find file at path: ${path}.`);
        }
    }

    @Action('write file to disk')
    writeText(path: string, content: any) {
        if (existsSync(path)) {
            return writeFileSync(path, content);
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
    async exec(command: string | string[], printToConsole = false) {
        if (printToConsole) {
            return new Promise((resolve, reject) => {
                const child = spawn(command, { shell: true, stdio: "inherit" });
                child.on('close', (code, signal) => {
                    resolve({ code, signal });
                });
            });
        } else {
            return await exec(command);
        }
    }

    @Action('billy')
    billy(path = '.'): boolean {
        return existsSync(path + '/node_modules/@fivethree/billy-core');
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

    @Action('commit')
    async commit(type: string, scope: string, message: string, path?: string) {
        let m = `${type}(${scope})`;
        m = message ? m + ': ' + message : m;
        return path ? await exec(`git --git-dir=${path}/.git --work-tree=${path} add -A && git --git-dir=${path}/.git --work-tree=${path} commit -m "${m}"`) : await exec(`git add -A && git commit -m "${m}"`);
    }

    @Action('push to remote')
    async push(path?: string, remote?: string, localBranch?: string, remoteBranch?: string) {
        const r = remote || 'origin';
        const curB = (await exec(`git --git-dir=${path}/.git --work-tree=${path} rev-parse --symbolic-full-name --abbrev-ref HEAD`)).stdout.replace('\n', '');
        const lB = localBranch || curB;
        const rB = remoteBranch || lB;
        return path ? await exec(`git --git-dir=${path}/.git --work-tree=${path} push ${r} "${lB}:${rB}"`) : await exec(`git push ${r} "${lB}:${rB}"`);
    }

    @Action('camelcase')
    camelcase(s: string, pascalCase: boolean = false) {
        const camel = camelCase(s);
        if (pascalCase) {
            return camel.charAt(0).toUpperCase() + camel.slice(1);
        }
        return camel;
    }
}
