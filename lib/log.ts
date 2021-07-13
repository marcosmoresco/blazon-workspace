import chalk from "chalk";

const log = console.log;

export const info = (text: string) => log(chalk.blue(text));
export const warn = (text: string) => log(chalk.yellow(text));
export const error = (text: string) => log(chalk.red(text));
