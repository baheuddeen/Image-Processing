# Image Processing
A website used to resize images using Sharp library.
more about sharp https://sharp.pixelplumbing.com/

### Current Tool Versions:

```sh
node --version # v12.22.1
npm --version # 7.12.0 or version 6.x
npx --version # 7.12.0 or version 6.x
```

# for linux users 
in the package .json change the sharp version 
```sh
"sharp": ^0.23.2
```

### To install run:
```sh
npm install
```

### To run Lintting/prettier:

```sh
npm run eslint/prettier
```

### To build:
```sh
npm run build
```


### To run tests:
```sh
npm run test
```

### To run start:
```sh
npm run start
```
the server will run at http://localhost:3000/

#### APIs End-points

### The home page index:
```sh
Get /
```

### Post resize an image:
to resize an image we need to pass the parametrs in this format 
"image-name_width_height.extention"

```sh
get api/get/resize/fjord_800_200.jpg
```

### Get the current images:
```sh
Get api/get/imagesList
```

### ./src
Contains main source code.

### ./static
Contains the static content with index.html


#### ./src/routes

End-points routes

#### ./src/utilites

Some functions used with the APIs 
