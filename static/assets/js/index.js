"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function parseHTML(text) {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(text, 'text/html');
    return htmlDoc.body.firstChild;
}
function watchingMouseClick() {
    // close dropDowns on click
    document.addEventListener('click', (event) => {
        document.querySelectorAll('.dropdown-toggle').forEach(dropdown => {
            var _a;
            if (event.target != dropdown) {
                dropdown.classList.remove('show');
                (_a = dropdown.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.remove('show');
            }
        });
    });
}
function configueDropdown() {
    document.querySelectorAll('.dropdown-toggle').forEach(dropdown => {
        dropdown.addEventListener('click', () => {
            var _a;
            dropdown.classList.toggle('show');
            (_a = dropdown.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.toggle('show');
        });
    });
}
function createImagesDropdown() {
    return __awaiter(this, void 0, void 0, function* () {
        const imagesDropdown = document.getElementById('select-images');
        if (imagesDropdown) {
            const resJson = yield fetch('http://localhost:3000/api/get/imagesList').then(data => data.json());
            const imagesList = resJson.imagesList;
            imagesDropdown.innerHTML = '';
            imagesList.forEach(image => {
                const element = parseHTML(`<li value="${image}">${image}</li>`);
                if (element)
                    imagesDropdown.appendChild(element);
            });
        }
    });
}
function clearResult() {
    document.getElementById('resized-image-section').innerHTML = '';
    document.getElementById('resize-check').innerHTML = '';
}
function imagesDropdownItems() {
    return __awaiter(this, void 0, void 0, function* () {
        yield createImagesDropdown();
        const imagesDropdown = document.getElementById('select-images');
        const previewImageElem = document.getElementById('image-preview');
        imagesDropdown.querySelectorAll('li').forEach(item => item.addEventListener('click', (event) => {
            const imageTarget = event.target;
            const imageName = imageTarget.getAttribute('value');
            const imageElement = parseHTML(`<img id="preview-image-src" src="/assets/images/${imageName}" class="img-thumbnail" alt="...">`);
            if (imageElement) {
                previewImageElem.innerHTML = '';
                previewImageElem.appendChild(imageElement);
                clearResult();
            }
            document.querySelector('#adjust-image .container').classList.remove('d-none');
            setTimeout(() => {
                window.scrollTo({ behavior: 'smooth', top: 9999 });
            }, 100);
        }));
    });
}
function previewUploadedImage() {
    const uploadImageElem = document.getElementById('upload-image');
    const previewImageElem = document.getElementById('image-preview');
    uploadImageElem.addEventListener('change', (event) => {
        let imageUrl = URL.createObjectURL(event.target.files[0]);
        console.log(event.target);
        const imageElem = parseHTML(`<img id="preview-image-src" src="${imageUrl}" alt="uploaded image" class="img-thumbnail" />`);
        if (imageElem) {
            document.querySelector('#adjust-image .container').classList.remove('d-none');
            document.querySelector('#adjust-image .set-image-params').classList.add('d-none');
            const uploadReminderElem = document.getElementById('upload-check');
            uploadReminderElem.innerHTML = '';
            uploadReminderElem.appendChild(parseHTML('<div class="alert alert-warning m-3" role="alert">Please upload the image</div>'));
            previewImageElem.innerHTML = '';
            previewImageElem.appendChild(imageElem);
            imageElem.addEventListener('load', () => {
                URL.revokeObjectURL(imageElem.src); // free memory
            });
            clearResult();
        }
    });
}
function uplaodImage() {
    const uploadImageBtn = document.getElementById('upload-image-button');
    uploadImageBtn.addEventListener('click', () => {
        document.querySelector('form input#upload-image').click();
        console.log(uploadImageBtn);
    });
    const uploadImageForm = document.getElementById('upload-image-form');
    uploadImageForm.addEventListener('submit', function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const url = this.getAttribute('action');
            const data = new FormData(this);
            if (url && data) {
                const res = yield fetch(url, {
                    method: 'post',
                    body: data,
                });
                console.log(res);
                if (res.status == 200) {
                    const previewImageElem = document.getElementById('preview-image-src');
                    const imageFile = document.getElementById('upload-image');
                    const uploadCheck = document.getElementById('upload-check');
                    const resizeImageParams = document.querySelector('#adjust-image .set-image-params');
                    previewImageElem.src = '/assets/images/' + imageFile.files[0].name;
                    resizeImageParams.classList.remove('d-none');
                    resizeImageParams.scrollIntoView({ behavior: 'smooth' });
                    const successAlert = parseHTML('<div class="alert alert-success" role="alert"> the image uploaded Successfly !</div>');
                    if (successAlert) {
                        uploadCheck.innerHTML = '';
                        uploadCheck.appendChild(successAlert);
                    }
                }
            }
        });
    });
}
function resizeImage() {
    const resizeImageForm = document.getElementById('resize-image-form');
    resizeImageForm.addEventListener('submit', function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const imageElem = document.getElementById('preview-image-src');
            const src = imageElem.src;
            const imageName = src.split('/').pop();
            const fileName = imageName === null || imageName === void 0 ? void 0 : imageName.split('.')[0];
            const width = +document.getElementById('image-width').value;
            const height = +document.getElementById('image-height').value;
            const ext = '.' + (imageName === null || imageName === void 0 ? void 0 : imageName.split('.').pop());
            let url = this.getAttribute('action');
            if (url && width && height) {
                const res = yield fetch(url, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        file_name: fileName,
                        width: width,
                        height: height,
                        ext: ext,
                    }),
                });
                const resJson = yield res.json();
                if (res.status == 200) {
                    const resizedImagePath = resJson.path;
                    const resizeCheckElem = document.getElementById('resize-check');
                    const successAlert = parseHTML('<div class="alert alert-success" role="alert"> the image Processed Successfly !</div>');
                    const resizedImageSectionElem = document.getElementById('resized-image-section');
                    const resizeImagElem = parseHTML(`<img id="preview-image-src" src="${resizedImagePath}" alt="...">`);
                    if (successAlert && resizeImagElem) {
                        resizeCheckElem.innerHTML = '';
                        resizeCheckElem.appendChild(successAlert);
                        resizedImageSectionElem.innerHTML = '';
                        resizedImageSectionElem.classList.remove('d-none');
                        resizedImageSectionElem.appendChild(resizeImagElem);
                        setTimeout(() => {
                            window.scrollTo({ behavior: 'smooth', top: 9999 });
                        }, 150);
                    }
                }
            }
            else {
                alert('please enter valid width and height');
            }
        });
    });
}
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    configueDropdown();
    watchingMouseClick();
    imagesDropdownItems();
    previewUploadedImage();
    uplaodImage();
    resizeImage();
}));
