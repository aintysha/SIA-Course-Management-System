import { QA, PRODUCTION } from "./config";

// Define ANSI escape codes for console colors and styles with retro vibes
const colours = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fg: {
    black: "\x1b[30m",     // classic black
    red: "\x1b[38;5;196m", // bright retro red
    green: "\x1b[38;5;34m", // retro green (brighter)
    yellow: "\x1b[38;5;220m", // mustard yellow
    blue: "\x1b[38;5;38m", // retro blue
    magenta: "\x1b[38;5;177m", // pastel magenta
    cyan: "\x1b[38;5;51m", // bright cyan
    white: "\x1b[38;5;15m", // pure white
    crimson: "\x1b[38;5;160m", // retro crimson
  },
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    crimson: "\x1b[48m",
  },
};

// Function to get the name of the calling function from the error stack
export function getCallingFunction(error: Error) {
  try {
    const stack = error.stack;
    if (stack === undefined) return "--";

    // Extract the third line of the stack trace (index 2)
    const line = stack.split("\n")[2];
    // Use regex to match the function name
    const regex = /^.*at\s([a-zA-Z]+).*$/;
    const groups = line.match(regex);

    if (groups === null || groups.length < 2) return "--";
    return groups[1];
  } catch {
    return "--";
  }
}

// Custom logging functions that only log in non-QA and non-PRODUCTION environments

// General log function
export function log(message?: any, ...optionalParams: any[]) {
  if (!QA && !PRODUCTION)
    console.log(
      `[${new Date().toLocaleString()}]`,
      colours.fg.magenta,
      "[SERVER-LOG] ",
      colours.reset,
      message,
      ...optionalParams
    );
}

// Info log function with cyan color and calling function name
export function info(message?: any, ...optionalParams: any[]) {
  if (!QA && !PRODUCTION)
    console.info(
      `[${new Date().toLocaleString()}]`,
      colours.fg.cyan,
      "[INFO]",
      colours.reset,
      colours.bg.green,
      `[${getCallingFunction(new Error())}]`,
      colours.reset,
      message,
      ...optionalParams
    );
}

// Warning log function with yellow color and calling function name
export function warn(message?: any, ...optionalParams: any[]) {
  if (!QA && !PRODUCTION)
    console.warn(
      `[${new Date().toLocaleString()}]`,
      colours.fg.yellow,
      "[WARN]",
      colours.reset,
      colours.bg.green,
      `[${getCallingFunction(new Error())}]`,
      colours.reset,
      message,
      ...optionalParams
    );
}

// Error log function with red color and calling function name
export function error(message?: any, ...optionalParams: any[]) {
  if (!QA && !PRODUCTION)
    console.error(
      `[${new Date().toLocaleString()}]`,
      colours.fg.red,
      "[ERROR]",
      colours.reset,
      colours.bg.green,
      `[${getCallingFunction(new Error())}]`,
      colours.reset,
      message,
      ...optionalParams
    );
}

// Create a logging object with all logging functions
const logging = {
  log,
  info,
  warn,
  error,
  warning: warn,
  getCallingFunction,
};

// Declare global types for TypeScript
declare global {
  var logging: {
    log: (message?: any, ...optionalParams: any[]) => void;
    info: (message?: any, ...optionalParams: any[]) => void;
    warn: (message?: any, ...optionalParams: any[]) => void;
    warning: (message?: any, ...optionalParams: any[]) => void;
    error: (message?: any, ...optionalParams: any[]) => void;
    getCallingFunction: (error: Error) => string;
  };
}

// Attach the logging object to the global scope
globalThis.logging = logging;

export default logging;
