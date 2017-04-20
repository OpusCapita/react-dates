#!/bin/sh

rm -rf .gh-pages-tmp  &&
mkdir .gh-pages-tmp &&
node node_modules/webpack/bin/webpack.js --config ./webpack.docs.config.js &&
cp lib/* .gh-pages-tmp &&
cp www/index.html .gh-pages-tmp &&

git checkout gh-pages &&
echo "LS 1!" && ls -la &&
git ls-files | grep -v -e "\(^\.gitignore$\|^\.gitattributes$\|^\.gh-pages-tmp$\)" | xargs rm -rf &&
echo "LS 2!" && ls -la &&
mv .gh-pages-tmp/* . &&
echo "LS 3!" && ls -la &&
rm -rf .gh-pages-tmp &&
echo "LS 4!" && ls -la &&
git add . &&
echo "LS 5!" && ls -la &&
git commit -m "Update gh-pages" &&
git push --force origin gh-pages &&
git checkout master
