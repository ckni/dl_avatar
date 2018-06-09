var request = require("request");
var fs = require("fs");
var mkdirp = require("mkdirp");
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

function downloadImageByURL(url, filePath) {
	request.get(url)
		.on("error", function(err) {
			throw err;
		})
		.on("response", function(response) {
			console.log("Response Status Code:", response.statusCode);
		})
		.pipe(fs.createWriteStream(filePath));
}

mkdirp("./Avatars", function(err) {
	if (err) {
		console.log(err);
	}
});

getRepoContributors("jquery", "jquery", function(err, result) {
	console.log("Errors:", err);
	var json = JSON.parse(result);
	json.forEach(function(e) {
		downloadImageByURL(e.avatar_url, "./Avatars/" + e.login + ".jpg");
	});
});
