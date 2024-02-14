//import { comments } from "multilang-extract-comments";
import extractComments from "multilang-extract-comments";

const code = `
/**
 * A javascript multiline-comment
 * with multiple lines
 */
function aLineOfCode () {
}

// A single line comments
// More of it directly below
function anotherFunction () {
  aLineOfCode()
}

anotherFunction()
`;
// const comments = extractComments(code);
// console.log(comments);

// const codeLines = code.split("\n");
// console.log("code lines = ", codeLines.length);

// const newLines = Array(codeLines.length).fill("");
// for (const [key, value] of Object.entries(comments)) {
//   console.log(`begin`, value.begin, "end=", value.end);
//   for (let i = value.begin; i <= value.end; i++) {
//     newLines[i - 1] = codeLines[i - 1];
//     console.log("assign =", i, codeLines[i - 1]);
//   }
// }

// console.log(newLines);

const pyOptions = {
  pattern: {
    name: "python",
    nameMatchers: [".py", ".py3"],
    singleLineComment: [{ start: "#" }],
    multiLineComment: [
      { start: '"""', middle: "", end: '"""' },
      { start: "'''", middle: "", end: "'''" },
    ],
  },
};

function extractMultilangComments(code, options) {
  const comments = extractComments(code, options);

  const codeLines = code.split("\n");

  const newLines = Array(codeLines.length).fill("");
  for (const [key, value] of Object.entries(comments)) {
    for (let i = value.begin; i <= value.end; i++) {
      newLines[i - 1] = codeLines[i - 1];
    }
  }

  return newLines.join("\n");
}

const pycode = `# hello
print('hello')
#world
print("world")
`;

function extractPythonComments(code) {
  return extractMultilangComments(code, pyOptions);
}

function extractJavascriptComments(code) {
  return extractMultilangComments(code, undefined);
}
console.log(extractMultilangComments(pycode, pyOptions));
console.log(extractMultilangComments(code, undefined));

export { extractPythonComments, extractJavascriptComments };
