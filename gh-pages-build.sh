#!/bin/sh

rm -rf .gh-pages-tmp  &&
mkdir .gh-pages-tmp &&
node node_modules/webpack/bin/webpack.js --config ./webpack.docs.config.js &&
cp lib/* .gh-pages-tmp &&
cp www/index.html .gh-pages-tmp &&

git checkout gh-pages &&
mv .gh-pages-tmp/* . &&
rm -rf .gh-pages-tmp &&
git push --force origin/gh-pages &&
git checkout master
