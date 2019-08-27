import {
  Plugin,
  Action,
  usesPlugins,
  Command,
  context,
  Context,
  App
} from "@fivethree/billy-core";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { GitPlugin } from "@fivethree/billy-plugin-git";
import { prompt } from "inquirer";
const util = require("util");
import chalk from "chalk";
const exec = util.promisify(require("child_process").exec);
import { spawn, SpawnOptions, ChildProcess } from "child_process";
const camelCase = require("camelcase");

export interface CorePlugin extends GitPlugin {}

@Plugin("billy-plugin-core")
export class CorePlugin {
  @usesPlugins(GitPlugin)
  @Action({
    addToHistory: true,
    description: (dur: number) => `Waited for ${dur}ms.`
  })
  async wait(dur: number): Promise<void> {
    console.log(`wait for ${dur}ms!`);
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("done waiting");
        resolve();
      }, dur);
    });
  }

  @Action({
    addToHistory: true,
    description: (path: string) => `Parsed JSON file at path ${path}`
  })
  parseJSON(path: string) {
    if (existsSync(path)) {
      return JSON.parse(readFileSync(path, "utf8"));
    } else {
      throw new Error(`Couldn't find file at path: ${path}.`);
    }
  }

  @Action({
    addToHistory: true,
    description: (path: string) => `Wrote JSON file at path ${path}`
  })
  writeJSON(path: string, content: any) {
    return writeFileSync(path, JSON.stringify(content, null, 4));
  }

  @Action({
    addToHistory: true,
    description: (path: string) => `Read file at path ${path}`
  })
  readFile(path: string) {
    if (existsSync(path)) {
      return readFileSync(path, "utf8");
    } else {
      throw new Error(`Couldn't find file at path: ${path}.`);
    }
  }

  @Action({
    addToHistory: true,
    description: (path: string) => `Wrote file at path ${path}`
  })
  writeFile(path: string, content: any) {
    return writeFileSync(path, content);
  }

  @Action({
    addToHistory: false
  })
  async prompt(args: any[] | string) {
    if (typeof args === "string") {
      return (await prompt([
        {
          name: "answer",
          message: args
        }
      ])).answer;
    } else {
      return await prompt(...args);
    }
  }

  @Action({
    addToHistory: false
  })
  exists(path: string): boolean {
    return existsSync(path);
  }

  @Action({
    addToHistory: true,
    description: (command: string) => `Executed command ${command}.`
  })
  async exec(
    command: string,
    print = false,
    detached = false
  ): Promise<ChildProcess> {
    if (print) {
      console.log(await this.colorize("orange", `> ${command}`));
      return new Promise((resolve, reject) => {
        let error;
        const options: SpawnOptions = {
          shell: true,
          stdio: [0, 1, "pipe"]
        };
        const child = spawn(command, options);

        child.stderr.on("data", data => {
          error = data.toString();
        });

        if (detached) {
          resolve(child);
        }

        child.on("close", code => {
          if (code !== 1) {
            resolve(child);
          } else {
            reject(error);
          }
        });
      });
    } else {
      return await exec(command);
    }
  }

  @Action({ addToHistory: false })
  billy(path = "."): boolean {
    return existsSync(path + "/node_modules/@fivethree/billy-core");
  }

  @Action({ addToHistory: false })
  colorize(color: string, input: string) {
    return chalk.keyword(color)(input);
  }

  @Action({
    addToHistory: true,
    description: (version: string, message: string) =>
      `Bumped Version ${version}: ${message}`
  })
  async bump(version: string, message: string, path?: string) {
    let m = `bump(${version})`;
    m = message ? m + ": " + message : m;
    return path
      ? await exec(
          `git --git-dir=${path}/.git --work-tree=${path} add -A && git --git-dir=${path}/.git --work-tree=${path} commit -m "${m}"`
        )
      : await exec(`git add -A && git commit -m "${m}"`);
  }

  @Action({ addToHistory: false })
  camelcase(s: string, pascalCase: boolean = false) {
    const camel = camelCase(s);
    if (pascalCase) {
      return camel.charAt(0).toUpperCase() + camel.slice(1);
    }
    return camel;
  }
}
