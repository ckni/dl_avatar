# GitHub Avatar Downloader

A simple Node.js application that will download the avatars of all contributors to any specified GitHub Project.

## Usage

Clone or download this repository.

Run `npm install`

Create a file called `secret.js` containing:
```js
module.exports = {
  GITHUB_TOKEN: "YOUR_TOKEN_HERE"
};
```

Replace `YOUR_TOKEN_HERE` with a [GitHub token](https://github.com/settings/token).

Run `dl_avatar.js <repo owner> <repo name>`

Where `<repo owner>` is the username of the owner of the repository and `<repo name>` is the name of the respository.

## Dependencies

* Node.js - https://nodejs.org
* Request - https://github.com/request/request
* Mkdirp - https://www.npmjs.com/package/mkdirp
* Fs - https://nodejs.org/api/fs.html
