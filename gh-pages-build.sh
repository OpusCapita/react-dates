#!/bin/sh

rm -rf lib .gh-pages-tmp
mkdir .gh-pages-tmp
webpack --config ./webpack.docs.config.js
cp lib/* .gh-pages-tmp
cp www/index.html .gh-pages-tmp

git checkout gh-pages
rm -rf ./*
git checkout master -- .gh-pages-tmp
mv .gh-pages-tmp/* .
rm -rf .gh-pages-tmp
git push origin/gh-pages

git checkout master
rm -rf .gh-pages-tmp
