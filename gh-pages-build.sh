#!/bin/sh

rm -rf .gh-pages-tmp  &&
mkdir .gh-pages-tmp &&
node node_modules/webpack/bin/webpack.js --config ./webpack.docs.config.js &&
cp lib/* .gh-pages-tmp &&
cp www/index.html .gh-pages-tmp &&

git checkout gh-pages &&
git ls-files | grep -v -e "\(^\.gitignore$\|^\.gitattributes$\|^\.gh-pages-tmp$\)" | xargs rm -rf &&
echo "LS!" &&
ls -la &&
mv .gh-pages-tmp/* . &&
rm -rf .gh-pages-tmp &&
git add . &&
git commit -m "Update gh-pages" &&
git push --force origin gh-pages &&
git checkout master
