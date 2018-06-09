var request = require("request");
var fs = require("fs");
var mkdirp = require("mkdirp");
var auth = require("./secret.js");
var user = process.argv[2];
var repo = process.argv[3];

// contact GitHub API to get data about members of a specified repository
function getRepoContributors(user, repo, cb) {
	var options = {
		url: "https://api.github.com/repos/" + user + "/" + repo + "/contributors",
		headers: {
			"User-Agent": "request"
		},
		authorization: auth.GITHUB_TOKEN
	};
	request(options, function(err, res, body) {
		cb(err, body);
	});
}

// download an image given its URL to a specified directory
function downloadImageByURL(url, filePath) {
	request.get(url)
		.on("error", function(err) {
			throw err;
		})
		.on("response", function(response) {
			if (response.statusCode !== 200) {
				console.log("Status Code", response.statusCode, "at", url);
			} else {
				console.log("Image successfully downloaded from", url);
			}
		})
		.pipe(fs.createWriteStream(filePath));
}

// making sure that parameters are valid
var usage = "Usage: node dl_avatar.js <repo owner> <repo name>";
if (!user || !repo) {
	// log error and terminate program
	console.log("Error: Missing parameters\n" + usage);
	process.exit();
} else {
	// make Avatars directory for storing downloaded images (if it does not already exist)
	mkdirp("./Avatars", function(err) {
		if (err) {
			console.log(err);
		}
	});
	// get json from github api, extract avatar URLs, and download images to Avatars directory
	getRepoContributors(user, repo, function(err, result) {
		// download avatar of each user into Avatars directory
		var json = JSON.parse(result);
		// make sure result exists
		if (json.message === "Not Found") {
			// log message and terminate program
			console.log("Error: Repository not found");
			process.exit();
		} else {
			json.forEach(function(e) {
				downloadImageByURL(e.avatar_url, "./Avatars/" + e.login + ".jpg");
			});
		}
	});
}
