// ==UserScript==
// @name                 Locale TXT Reader
// @namespace            http://tampermonkey.net/
// @version              0.1
// @description          Read locale txt file on opened web pages
// @description:zh-CN    在打开的网页上查看本地txt文件。说明：在第8行以下的match里，添加网址。注：部分网站可能屏蔽脚本
// @author               Jun
// @license         	 MIT
// @match           	 *://*.start.spring.io/*
// @match           	 *://*.www.eduplus.net/*
// @match           	 *://*.github.com/*
// @match           	 *://*.youtube.com/*
// @grant                none
// @run-at               document-start
// ==/UserScript==

(function() {
    'use strict';

    // Create the floating window
    var floatingWindow = document.createElement('div');
    floatingWindow.style.position = 'fixed';
    floatingWindow.style.top = '10px';
    floatingWindow.style.right = '10px';
    floatingWindow.style.width = '300px';
    floatingWindow.style.height = '400px';
    floatingWindow.style.backgroundColor = 'white';
    floatingWindow.style.border = '1px solid black';
    floatingWindow.style.zIndex = '10000';
    floatingWindow.style.padding = '10px';
    floatingWindow.style.overflowY = 'scroll';
    floatingWindow.style.display = 'none';
    document.body.appendChild(floatingWindow);

    // Create a button to open the file selector
    var openFileButton = document.createElement('button');
    openFileButton.textContent = ' ';
    openFileButton.style.marginBottom = '10px';
    floatingWindow.appendChild(openFileButton);

    // Create a file input element
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt';
    fileInput.style.display = 'none';
    floatingWindow.appendChild(fileInput);

    // Create a pre element to display the file content
    var fileContent = document.createElement('pre');
    fileContent.style.whiteSpace = 'pre-wrap'; // Ensures long lines wrap
    fileContent.style.wordWrap = 'break-word'; // Break long words if necessary
    floatingWindow.appendChild(fileContent);

    // Event listener for the open file button
    openFileButton.addEventListener('click', function() {
        fileInput.click();
    });

    // Event listener for file input change
    fileInput.addEventListener('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                fileContent.textContent = e.target.result;
            };
            reader.readAsText(file);
        }
    });

    // Create a button to toggle the floating window visibility
    var toggleButton = document.createElement('button');
    toggleButton.textContent = ' ';
    toggleButton.style.position = 'fixed';
    toggleButton.style.top = '100px';
    toggleButton.style.right = '300px';
    toggleButton.style.zIndex = '10000';
    document.body.appendChild(toggleButton);

    // Event listener for the toggle button
    toggleButton.addEventListener('click', function() {
        if (floatingWindow.style.display === 'none') {
            floatingWindow.style.display = 'block';
        } else {
            floatingWindow.style.display = 'none';
        }
    });

   // Create a button to set text color to black
    var blackColorButton = document.createElement('button');
    blackColorButton.textContent = ' ';
    blackColorButton.style.marginLeft = '5px';
    blackColorButton.style.padding = '5px';
    blackColorButton.style.backgroundColor = 'black';
    blackColorButton.style.color = 'white';
    blackColorButton.style.border = '1px solid #ccc';
    blackColorButton.style.cursor = 'pointer';
    blackColorButton.style.borderRadius = '3px';
    openFileButton.parentNode.insertBefore(blackColorButton, openFileButton.nextSibling);

    // Event listener for the black color button
    blackColorButton.addEventListener('click', function() {
        fileContent.style.color = 'black';
    });

    // Create a button to set text color to white
    var whiteColorButton = document.createElement('button');
    whiteColorButton.textContent = ' ';
    whiteColorButton.style.marginLeft = '5px';
    whiteColorButton.style.padding = '5px';
    whiteColorButton.style.backgroundColor = 'white';
    whiteColorButton.style.color = 'black';
    whiteColorButton.style.border = '1px solid #ccc';
    whiteColorButton.style.cursor = 'pointer';
    whiteColorButton.style.borderRadius = '3px';
    openFileButton.parentNode.insertBefore(whiteColorButton, blackColorButton.nextSibling);

    // Event listener for the white color button
    whiteColorButton.addEventListener('click', function() {
        fileContent.style.color = 'white';
    });
})();