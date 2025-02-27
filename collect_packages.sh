#!/bin/bash

PACKAGES_LIST=$(curl https://feed.libremesh.org/master/index.json | jq -r '.packages | to_entries[] | "\(.key)"')
GITHUB_URL="https://raw.githubusercontent.com/libremesh/lime-packages/master/packages"
PACKAGES_DIR=packages
READMES=(Readme.md README.md README README.adoc) 

mkdir -p $PACKAGES_DIR

# cleanup
rm -r `ls packages/ | grep -v "index.txt" | sed 's|^|packages/|g'`
echo "packages:" > _data/packages.yml

for name in $PACKAGES_LIST; do
	echo "  - name: $name" >> _data/packages.yml

	cat << EOF >> $PACKAGES_DIR/$name.txt
---
title: $name
ref: $name
lang: en
---
EOF

	README=""
	for file in READMES; do
		README=$(curl "$GITHUB_URL/$name/$file" || "")
		if [ "$README" != "404: Not Found" ]; then break; fi
	done

	if [ "$README" != "404: Not Found" ]; then \
	cat << EOF >> $PACKAGES_DIR/$name.txt

== Readme
____
$README
____
EOF
	fi

	MAKEFILE=$(curl "$GITHUB_URL/$name/Makefile") && \
	cat << EOF >> $PACKAGES_DIR/$name.txt

== Makefile
[,make]
----
$MAKEFILE
----
EOF

done
