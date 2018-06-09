# Avatar Downloader

## About

This is a simple Node.JS application that will download the avatars of all contributors to any specified GitHub Project.

## Usage

Clone or download this repository.

Run `npm install`.

Create a file called `secret.js` containing
```js
module.exports = {
  GITHUB_TOKEN: "YOUR_TOKEN_HERE"
};
```

Replace `YOUR_TOKEN_HERE` with a [GitHub token](https://github.com/settings/token)

Run `dl_avatar.js <repo owner> <repo name>`.

Where <repo owner> is the username of the owner of the repository and <repo name> is the name of the respository.
