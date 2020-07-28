import './main.scss';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}
// Elements
var testimonialsContainerEl = document.querySelector(".container");

var quotesEl = document.querySelectorAll(".quote");
var imageContainerEl = document.querySelectorAll(".author-img");
var previousEl = document.querySelector(".previous");
var nextEl = document.querySelector(".next");


// Slider variables
var totalSlides = quotesEl.length;
var currentSlideNumber = 1;
var nextSlideNumber = currentSlideNumber + 1;
var previousSlideNumber = totalSlides;
var slideSpeed = 900;


var currentSlide = "";
var nextSlide = "";
var previousSlide = "";

var currentPhoto = "";
var nextPhoto = "";
var previousPhoto = "";



// Iterate over previous and next elements
// On click, check direction, fade next image in and assign current image number
var previousAndNext = [previousEl, nextEl];
for (var t = 0; t < previousAndNext.length; t++) {
    if (totalSlides > 1) {
        previousAndNext[t].onclick = function (e) {
            var direction = e.target.getAttribute('class');

            if (direction == "next") {
                nextSlideFade();
                currentSlideNumber = nextSlideNumber;
            } else {
                previousSlideFade();
                currentSlideNumber = previousSlideNumber;
            }

            callFunctions();
        };
    }
}


function imgLoop() {
    nextSlideNumber = currentSlideNumber + 1;
    previousSlideNumber = currentSlideNumber - 1;

    if (currentSlideNumber == totalSlides) {
        nextSlideNumber = 1;
    }

    if (currentSlideNumber == 1) {
        previousSlideNumber = totalSlides;
    }
}

function setSlidePosition() {
    currentSlide = testimonialsContainerEl.querySelector('.quote:nth-child(' + currentSlideNumber + ')');
    nextSlide = testimonialsContainerEl.querySelector('.quote:nth-child(' + nextSlideNumber + ')');
    previousSlide = testimonialsContainerEl.querySelector('.quote:nth-child(' + previousSlideNumber + ')');


    currentPhoto = testimonialsContainerEl.querySelector('.author-img:nth-child(' + currentSlideNumber + ')');
    nextPhoto = testimonialsContainerEl.querySelector('.author-img:nth-child(' + nextSlideNumber + ')');
    previousPhoto = testimonialsContainerEl.querySelector('.author-img:nth-child(' + previousSlideNumber + ')');

}

function callFunctions() {
    imgLoop();
    setSlidePosition();
}

function nextSlideFade() {
    fadeTo([currentSlide, currentPhoto], slideSpeed, 0);
    fadeTo([nextSlide, nextPhoto], slideSpeed, 1);

}

function previousSlideFade() {
    fadeTo([currentSlide, currentPhoto], slideSpeed, 0);
    fadeTo([previousSlide, previousPhoto], slideSpeed, 1);
}
function fadeTo(element, speed, opacity) {

    setCSS({
        transition: 'opacity ' + speed + 'ms',
        opacity: opacity,
    }, element);
}
// Set CSS to element or elements
function setCSS(styles, elements) {
    if (elements.length > 1) {
        for (var i = 0; i < elements.length; i++) {
            Object.assign(elements[i].style, styles);
        }
    } else {
        Object.assign(elements.style, styles);
    }
}


function loadSlide() {
    setCSS({
        transition: `opacity ${slideSpeed}ms`,
        opacity: 1,
    }, [currentSlide, currentPhoto]);

}
setSlidePosition();
loadSlide();