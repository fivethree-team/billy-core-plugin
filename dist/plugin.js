"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var billy_core_1 = require("@fivethree/billy-core");
var fs_1 = require("fs");
var prompt = require('inquirer').prompt;
var util = require('util');
var exec = util.promisify(require('child_process').exec);
var spawn = require('child_process').spawn;
var camelCase = require('camelcase');
var axios = require('axios');
var CorePlugin = /** @class */ (function () {
    function CorePlugin() {
    }
    CorePlugin.prototype.print = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, args);
    };
    CorePlugin.prototype.wait = function (dur) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("wait for " + dur + "ms!");
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            console.log('done waiting');
                            resolve();
                        }, dur);
                    })];
            });
        });
    };
    CorePlugin.prototype.parseJSON = function (path) {
        if (fs_1.existsSync(path)) {
            return JSON.parse(fs_1.readFileSync(path, 'utf8'));
        }
        else {
            throw new Error("Couldn't find file at path: " + path + ".");
        }
    };
    CorePlugin.prototype.writeJSON = function (path, content) {
        if (fs_1.existsSync(path)) {
            return fs_1.writeFileSync(path, JSON.stringify(content, null, 4));
        }
        else {
            throw new Error("File doesn't exists: " + path + ".");
        }
    };
    CorePlugin.prototype.readText = function (path) {
        if (fs_1.existsSync(path)) {
            return fs_1.readFileSync(path, 'utf8');
        }
        else {
            throw new Error("Couldn't find file at path: " + path + ".");
        }
    };
    CorePlugin.prototype.writeText = function (path, content) {
        if (fs_1.existsSync(path)) {
            return fs_1.writeFileSync(path, content);
        }
        else {
            throw new Error("File doesn't exists: " + path + ".");
        }
    };
    CorePlugin.prototype.prompt = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof args === 'string')) return [3 /*break*/, 2];
                        return [4 /*yield*/, prompt([
                                {
                                    name: 'answer',
                                    message: args,
                                }
                            ])];
                    case 1: return [2 /*return*/, (_a.sent()).answer];
                    case 2: return [4 /*yield*/, prompt.apply(void 0, args)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CorePlugin.prototype.exists = function (path) {
        return fs_1.existsSync(path);
    };
    CorePlugin.prototype.exec = function (command, printToConsole) {
        if (printToConsole === void 0) { printToConsole = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!printToConsole) return [3 /*break*/, 1];
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var child = spawn(command, { shell: true, stdio: "inherit" });
                                child.on('close', function (code, signal) {
                                    resolve({ code: code, signal: signal });
                                });
                            })];
                    case 1: return [4 /*yield*/, exec(command)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CorePlugin.prototype.billy = function (path) {
        if (path === void 0) { path = '.'; }
        return fs_1.existsSync(path + '/node_modules/@fivethree/billy-core');
    };
    CorePlugin.prototype.gitClean = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var status, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!path) return [3 /*break*/, 2];
                        return [4 /*yield*/, exec("git --git-dir=" + path + "/.git --work-tree=" + path + " status --porcelain")];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, exec('git status --porcelain ')];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        status = _a;
                        return [2 /*return*/, status.stdout.length === 0 && status.stderr.length === 0];
                }
            });
        });
    };
    CorePlugin.prototype.bump = function (version, message, path) {
        return __awaiter(this, void 0, void 0, function () {
            var m, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        m = "bump(" + version + ")";
                        m = message ? m + ': ' + message : m;
                        if (!path) return [3 /*break*/, 2];
                        return [4 /*yield*/, exec("git --git-dir=" + path + "/.git --work-tree=" + path + " add -A && git --git-dir=" + path + "/.git --work-tree=" + path + " commit -m \"" + m + "\"")];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, exec("git add -A && git commit -m \"" + m + "\"")];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, _a];
                }
            });
        });
    };
    CorePlugin.prototype.commit = function (type, scope, message, path) {
        return __awaiter(this, void 0, void 0, function () {
            var m, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        m = type + "(" + scope + ")";
                        m = message ? m + ': ' + message : m;
                        if (!path) return [3 /*break*/, 2];
                        return [4 /*yield*/, exec("git --git-dir=" + path + "/.git --work-tree=" + path + " add -A && git --git-dir=" + path + "/.git --work-tree=" + path + " commit -m \"" + m + "\"")];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, exec("git add -A && git commit -m \"" + m + "\"")];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, _a];
                }
            });
        });
    };
    CorePlugin.prototype.push = function (path, remote, localBranch, remoteBranch) {
        return __awaiter(this, void 0, void 0, function () {
            var r, curB, lB, rB, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        r = remote || 'origin';
                        return [4 /*yield*/, exec("git --git-dir=" + path + "/.git --work-tree=" + path + " rev-parse --symbolic-full-name --abbrev-ref HEAD")];
                    case 1:
                        curB = (_b.sent()).stdout.replace('\n', '');
                        lB = localBranch || curB;
                        rB = remoteBranch || lB;
                        if (!path) return [3 /*break*/, 3];
                        return [4 /*yield*/, exec("git --git-dir=" + path + "/.git --work-tree=" + path + " push " + r + " \"" + lB + ":" + rB + "\"")];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, exec("git push " + r + " \"" + lB + ":" + rB + "\"")];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/, _a];
                }
            });
        });
    };
    CorePlugin.prototype.camelcase = function (s, pascalCase) {
        if (pascalCase === void 0) { pascalCase = false; }
        console.log('camelcase', s, pascalCase, camelCase, camelCase(s));
        var camel = camelCase(s);
        if (pascalCase) {
            return camel.charAt(0).toUpperCase() + camel.slice(1);
        }
        return camel;
    };
    CorePlugin.prototype.pluginLane = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('plugin lane');
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        billy_core_1.Action('print in console')
    ], CorePlugin.prototype, "print", null);
    __decorate([
        billy_core_1.Action('wait')
    ], CorePlugin.prototype, "wait", null);
    __decorate([
        billy_core_1.Action('parseJSON')
    ], CorePlugin.prototype, "parseJSON", null);
    __decorate([
        billy_core_1.Action('writeJSON')
    ], CorePlugin.prototype, "writeJSON", null);
    __decorate([
        billy_core_1.Action('read file from disk')
    ], CorePlugin.prototype, "readText", null);
    __decorate([
        billy_core_1.Action('write file to disk')
    ], CorePlugin.prototype, "writeText", null);
    __decorate([
        billy_core_1.Action('prompt')
    ], CorePlugin.prototype, "prompt", null);
    __decorate([
        billy_core_1.Action('exists')
    ], CorePlugin.prototype, "exists", null);
    __decorate([
        billy_core_1.Action('exec')
    ], CorePlugin.prototype, "exec", null);
    __decorate([
        billy_core_1.Action('billy')
    ], CorePlugin.prototype, "billy", null);
    __decorate([
        billy_core_1.Action('gitClean')
    ], CorePlugin.prototype, "gitClean", null);
    __decorate([
        billy_core_1.Action('bump')
    ], CorePlugin.prototype, "bump", null);
    __decorate([
        billy_core_1.Action('commit')
    ], CorePlugin.prototype, "commit", null);
    __decorate([
        billy_core_1.Action('push to remote')
    ], CorePlugin.prototype, "push", null);
    __decorate([
        billy_core_1.Action('camelcase')
    ], CorePlugin.prototype, "camelcase", null);
    __decorate([
        billy_core_1.Lane('Plugin Lane')
    ], CorePlugin.prototype, "pluginLane", null);
    CorePlugin = __decorate([
        billy_core_1.Plugin('billy-plugin-core')
    ], CorePlugin);
    return CorePlugin;
}());
exports.CorePlugin = CorePlugin;
