![Logo](./public/icon_128.png)

Seppuku
-------
> An open source sudoku game

[![Website](https://img.shields.io/website-up-down-green-red/https/seppuku.surge.sh.svg?style=flat-square)](https://seppuku.surge.sh)
![license](https://img.shields.io/github/license/colatkinson/seppuku.svg?style=flat-square)

Seppuku runs entirely client-side, and is written with React, Redux, and Typescript, and uses the very nice `semantic-ui-react` and `react-snapshot` libraries. It implements algorithms from the paper [Sudoku Puzzles Generating: from Easy to Evil](http://zhangroup.aporc.org/images/files/Paper_3485.pdf).

Check out a live [demo](https://seppuku.surge.sh)!

Installing / Getting Started
============================

```shell
git clone git@github.com:colatkinson/seppuku.git
yarn install
yarn start
```

This will open up a browser window and run a development server. Then you can play to your heart's content.

Production Builds
=================

To generate an optimized production build, simply run

```shell
yarn build
```

This will create the webpack bundle, and will create a static `index.html` with `react-snapshot`.

Deployment
==========

Currently, the deploy script is made for [Surge](https://surge.sh). Just run `yarn deploy` and it will serve the site statically. It expects the domain name to be specified in a `CNAME` file in the root directory, and will fail without this.

Contributing
============

Contributions are happily accepted! Just make sure that your code passes [TSLint](https://palantir.github.io/tslint/) and generally follows the conventions.

Licensing
=========

Seppuku is offered under the [GPLv3](./LICENSE). If anyone wants to make a close-source copy of this... Why?