# chrome-bookmarks-filter

After many years of running chrome, my bookmark file become too huge, it is about 100MB. It is caused by too many failed sync with server. This tool is written to filter the  garbage.

## How To Run

First You need node.js, downlowd [here](https://nodejs.org/en/download/). Then run the command `node index.js input out`.
The `input` is the bookmarks file with `json` format, you can find it in the chrome user data directory. [Here](https://www.chromium.org/user-experience/user-data-directory), you can find the `Bookmarks` file. Just replace it with the `out` file.
