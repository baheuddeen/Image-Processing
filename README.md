# Image Processing
A website used to resize images using Sharp library.
more about sharp https://sharp.pixelplumbing.com/

### Windows users need to disable autocrl in git before pull
```sh
git config --global core.autocrlf false
```

### Current Tool Versions:

```sh
node --version # v12.22.1
npm --version # 7.12.0 or version 6.x
npx --version # 7.12.0 or version 6.x
```

### To install run:
```sh
npm install
```

### To build:
```sh
npm run build
```

### To run tests:

```sh
npm run test
```

### To run Lintting/prettier:

```sh
npm run eslint/prettier
```


### To run tests:
```sh
npm build:server
```

### ./src
Contains main source code.

### ./src/static
Contains the static content with index.html


#### ./src/routes

End-points routes

#### ./src/utilites

Some functions used with the APIs 



#### APIs End-points

### The home page index:
```sh
Get /
```

### Get the current images:
```sh
Get /get/imagesList
```

### Post resize an image:
to resize an image we need to pass the parametrs in this format 
"image-name_width_height.extention"

```sh
Post /post/resize/fjord_800_200.jpg
```
