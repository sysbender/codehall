todos:

project name

hello-js.js
hello-py.py

## build script

1. generate project files from the content in the folder

## wrapper livecode in react component

1. load project
2. toggle extract comments

## setup react project

https://hackteam.io/blog/create-react-project-from-scratch-without-framework/
https://dev.to/riyanegi/setting-up-webpack-5-with-react-and-babel-from-scratch-2021-271l

- install webpack and webpack-cli
- add src/index.js
- package.json : `webpack --mode=development`
- webpack.config.js : entry
- install react: `npm install --save react react-dom`
- install babel: `npm install --saveDev @babel/core babel-loader @babel/preset-env @babel/preset-react`
- install plugin to inject js: `npm install --save-dev html-webpack-plugin`
