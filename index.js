const core = require("@actions/core");
const github = require("@actions/github");

try {
  const string = core.getInput("string");
  const start = core.getInput("start");
  const end = core.getInput("end");

  let result = "";
  if (string) {
    const pos = string.indexOf(start) + start.length;
    result = string.substring(pos, string.indexOf(end, pos));
  }

  core.setOutput("substring", result);
} catch (error) {
  core.setFailed(error.message);
}
