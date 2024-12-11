import { QA, PRODUCTION } from "./config";

// Define ANSI escape codes for console colors and styles with new retro vibes
const colours = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",     // Bold, used to emphasize logs
  dim: "\x1b[2m",        // Dimmed text, could be used for less important logs
  underscore: "\x1b[4m", // Underline text, often used for error logs
  blink: "\x1b[5m",      // Blinking text, could be rare for alerts
  reverse: "\x1b[7m",    // Reversed colors (foreground and background)
  hidden: "\x1b[8m",     // Hidden text, could be used for confidential logs

  fg: {
    teal: "\x1b[38;5;37m",     // Teal: a mix of blue and green
    lavender: "\x1b[38;5;163m", // Lavender: soft purple
    peach: "\x1b[38;5;214m",    // Peach: faded orange
    chartreuse: "\x1b[38;5;190m", // Chartreuse: yellow-green
    slateBlue: "\x1b[38;5;67m",  // Slate blue: muted dark blue
    magenta: "\x1b[38;5;177m",  // Pastel magenta
    cyan: "\x1b[38;5;51m",      // Bright cyan
    white: "\x1b[38;5;15m",     // Pure white
    crimson: "\x1b[38;5;160m",  // Retro crimson
  },
  bg: {
    teal: "\x1b[48;5;37m",     // Teal background
    lavender: "\x1b[48;5;163m", // Lavender background
    peach: "\x1b[48;5;214m",    // Peach background
    chartreuse: "\x1b[48;5;190m", // Chartreuse background
    slateBlue: "\x1b[48;5;67m",  // Slate Blue background
    black: "\x1b[40m",          // Retro gray background
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    crimson: "\x1b[48;5;160m",  // Crimson background
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
      colours.bright,          // Apply bold (bright) for emphasis
      colours.fg.lavender,     // Lavender for general log
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
      colours.bright,           // Bold for emphasis
      colours.fg.cyan,          // Cyan for info
      "[INFO]",
      colours.reset,
      colours.bg.chartreuse,    // Chartreuse for background
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
      colours.bright,         // Bold for emphasis
      colours.fg.peach,       // Peach for warning
      "[WARN]",
      colours.reset,
      colours.bg.slateBlue,   // Slate blue for background
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
      colours.bright,          // Bold for emphasis
      colours.underscore,      // Underline for error emphasis
      colours.fg.teal,         // Teal for error color
      "[ERROR]",
      colours.reset,
      colours.bg.peach,        // Peach background
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
