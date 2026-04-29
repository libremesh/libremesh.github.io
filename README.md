# LibreMesh website

The website is updated every time a commit is made and twice a week,
on Mondays and Thursdays, to keep the packages' README files in sync.

## Offline documentation
The files in the `./docs/guide` and `./docs/reference` directories are included 
in the `lime-docs` package, which is included by default.

## Setup a development server
In order to generate the website locally for testing your changes install VitePress.

Install pnpm
```
wget -qO- https://get.pnpm.io/install.sh | sh -
```

Install all dependencies
```
pnpm i
```

Install nodejs
```
pnpm env use -g lts
```

Run the development server
```
pnpm dev
```

The website will be visible at http://localhost:5173/