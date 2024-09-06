const core = require("@actions/core");
const github = require("@actions/github");

try {
  const string = core.getInput("string");
  const start = core.getInput("start");
  const end = core.getInput("end");

  let result = "";
  let smallest_error = "";
  if (string) {
    const pos = string.indexOf(start) + start.length;
    result = string.substring(pos, string.indexOf(end, pos));
	console.log("****1" + result.split('All Component Failures:\n'));
	var errorListStr = result.split('All Component Failures:\n')[1];
	console.log("****2" + errorListStr.split('\d\.'));
	smallest_error = getErrorWithMinChars(errorListStr.split('\n'));
	console.log("****" + smallest_error);
  }

  core.setOutput("substring", result);
  core.setOutput("smallest_error", smallest_error);
} catch (error) {
  core.setFailed(error.message);
}

function getErrorWithMinChars(arr) {
	var filtered = arr.filter(function(el) {
		return (el != null && el != "" && el != undefined);
	});

    if (filtered.length === 0) {
        return "";
    }

    var max = filtered[0];
    var maxIndex = 0;

    for (var i = 1; i < filtered.length; i++) {
        if (filtered[i] < max) {
            maxIndex = i;
            max = filtered[i];
        }
    }

    return filtered[maxIndex];
}

