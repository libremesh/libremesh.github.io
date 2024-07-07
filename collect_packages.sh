#!/bin/bash

PACKAGES_INDEX=$(yq '.packages' _data/packages.yml)
GITHUB_URL="https://raw.githubusercontent.com/libremesh/lime-packages/master/packages"
PACKAGES_DIR=packages
mkdir -p $PACKAGES_DIR

echo $PACKAGES_INDEX | jq -r '.[]|[.name, .readme, .makefile_external_url] | @tsv' |
  while IFS=$'\t' read -r name readme makefile_external_url; do
		
		[ -n "$name" ] && echo $name && \
cat /dev/null > $PACKAGES_DIR/$name.txt && \
cat << EOF >> $PACKAGES_DIR/$name.txt
---
title: $name
ref: $name
lang: en
---
EOF

		[ -n "$readme" ] && echo $readme && \
README="" && \
README=$(curl "$GITHUB_URL/$name/$readme") && \
cat << EOF >> $PACKAGES_DIR/$name.txt

== Readme
____
$README
____
EOF

MAKEFILE_URL=""
	[ -n "$makefile_external_url" ] && \
MAKEFILE_URL="$makefile_external_url" || \
MAKEFILE_URL="$GITHUB_URL/$name/Makefile"

MAKEFILE=$(curl "$MAKEFILE_URL") && \
cat << EOF >> $PACKAGES_DIR/$name.txt

== Makefile
[,make]
----
$MAKEFILE
----
EOF

  done

