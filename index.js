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
	if(result.includes('All Component Failures:\n')) {
		console.log('DEPLOYMENT FAILED');
		console.log("****1" + result.split('All Component Failures:\n'));
		var errorListStr = result.split('All Component Failures:\n')[1];
		console.log("****2" + errorListStr.split(/\d\. /));
		smallest_error = getErrorWithMinChars(errorListStr.split(/\d\. /));
		console.log("****" + smallest_error);
		core.setOutput("substring", result);
  		core.setOutput("smallest_error", smallest_error);
	} else if(result.includes('All Test Failures:\n')) {
		console.log('TEST CLASSES FAILED');
		var testFailuresListStr = result.split('All Test Failures:\n')[1];
		core.setOutput("substring", result);
  		core.setOutput("smallest_error", testFailuresListStr);
	}
  }
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
		console.log("Value is: " + filtered[i]);
        if (filtered[i].length < max.length) {
            maxIndex = i;
            max = filtered[i];
        }
    }

    return filtered[maxIndex];
}

