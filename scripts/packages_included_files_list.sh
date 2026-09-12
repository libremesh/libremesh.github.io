#!/bin/sh

lime_pkgs="./lime-packages/"
files_list="../docs/packages/included_files_list.md"

cd $lime_pkgs

files=$(find packages/*/files/* -type f | sed 's,packages/.*/files,,g' | sort -u)

cat << EOF > "$files_list"
| file	| package	|
| ----- | ----------------- |
EOF

for file in $(echo $files | sed 's, ,\n,g'); do

packages=$(find packages/*/files/$file | sed 's,packages/\(.*\)/files/.*,\1,' | sort -u ) 
packages_print=$(echo $packages | sed 's,\n, ,g')

printf "| $file\t| $packages_print\t|\n"

done >> "$files_list"

