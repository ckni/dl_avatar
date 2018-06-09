var request = require("request");
var auth = require("./secret.js");
var user = process.argv[2];
var repo = process.argv[3];

function getRepoContributors(user, repo, cb) {
	var options = {
		url: "https://api.github.com/repos/" + user + "/" + repo + "/contributors",
		headers: {
			"User-Agent": "request"
		},
		authorization: auth.GITHUB_TOKEN
	}
	request(options, function(err, res, body) {
		cb(err, body);
	});
}

getRepoContributors("jquery", "jquery", function(err, result) {
	console.log("Errors:", err);
	var json = JSON.parse(result);
	json.forEach(function(e) {
		console.log(e.avatar_url);
	});
});
