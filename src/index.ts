/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 *
 * Copyright 2019 Elijah Cobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

import { ChildProcessWithoutNullStreams, spawn } from "child_process";

export type ProcessResponse = {
	code: number,
	data: string,
};

export class Process {

	private readonly command: string;
	private readonly args: string[];

	public constructor(command: string, ...args: string[]) {

		this.command = command;
		this.args = args;

	}

	public async run(): Promise<ProcessResponse> {

		const process: ChildProcessWithoutNullStreams = spawn(this.command, this.args);

		let res: string = "";

		return new Promise<ProcessResponse>(((resolve: Function, reject: Function): void => {


			process.stdout.on("data", (data: Buffer) => {
				res = data.toString("utf8");
			});

			process.stderr.on("data", (data: Buffer) => {
				res = data.toString("uft8");
			});

			process.on("close", (code: number) => {

				(code === 0 ? resolve : reject )({ data: res, code });

			});

		}));

	}

}