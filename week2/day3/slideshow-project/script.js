// 20 dummy images
let images = [
  "https://picsum.photos/800/400?random=1",
  "https://picsum.photos/800/400?random=2",
  "https://picsum.photos/800/400?random=3",
  "https://picsum.photos/800/400?random=4",
  "https://picsum.photos/800/400?random=5",
  "https://picsum.photos/800/400?random=6",
  "https://picsum.photos/800/400?random=7",
  "https://picsum.photos/800/400?random=8",
  "https://picsum.photos/800/400?random=9",
  "https://picsum.photos/800/400?random=10",
  "https://picsum.photos/800/400?random=11",
  "https://picsum.photos/800/400?random=12",
  "https://picsum.photos/800/400?random=13",
  "https://picsum.photos/800/400?random=14",
  "https://picsum.photos/800/400?random=15",
  "https://picsum.photos/800/400?random=16",
  "https://picsum.photos/800/400?random=17",
  "https://picsum.photos/800/400?random=18",
  "https://picsum.photos/800/400?random=19",
  "https://picsum.photos/800/400?random=20",
];

let currentIndex = 0;
let track = document.querySelector("#track");
let startBtn = document.querySelector("#start");
let stopBtn = document.querySelector("#stop");
let previousBtn = document.querySelector("#previous");
let nextBtn = document.querySelector("#next");
let counterEl = document.querySelector("#counter");
let slider = null; // holds the setInterval id for autoplay

images.forEach((src) => {
  let slide = document.createElement("div");
  slide.classList.add("carousel-slide");

  let imgEl = document.createElement("img");
  imgEl.src = src;
  imgEl.alt = "Slideshow Image";

  slide.appendChild(imgEl);
  track.appendChild(slide);
});

function goToSlide(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
  counterEl.textContent = `${index + 1} / ${images.length}`;
}

function showNext() {
  currentIndex++;
  if (currentIndex === images.length) {
    currentIndex = 0;
  }
  goToSlide(currentIndex);
}

function showPrevious() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  goToSlide(currentIndex);
}

function startAutoSlide() {
  clearInterval(slider);
  slider = setInterval(showNext, 2000);
}

function stopAutoSlide() {
  clearInterval(slider);
  slider = null;
}

// Show first slide and start playing automatically on page load
goToSlide(currentIndex);
startAutoSlide();

stopBtn.addEventListener("click", function () {
  stopAutoSlide();
});

startBtn.addEventListener("click", function () {
  startAutoSlide();
});

// Clicking next/previous stops the autoplay and behaves like a
// normal manual slider, as required by the assignment.
nextBtn.addEventListener("click", () => {
  stopAutoSlide();
  showNext();
});

previousBtn.addEventListener("click", () => {
  stopAutoSlide();
  showPrevious();
});