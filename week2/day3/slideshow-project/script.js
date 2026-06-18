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
let img = document.querySelector("img");
let startBtn = document.querySelector("#start");
let stopBtn = document.querySelector("#stop");
let previousBtn = document.querySelector("#previous");
let nextBtn = document.querySelector("#next");

img.src = images[currentIndex];

let slider = setInterval(() => {
  currentIndex++;

  if (currentIndex === images.length) {
    currentIndex = 0;
  }

  img.src = images[currentIndex]
}, 2000);

stopBtn.addEventListener("click", function () {
  clearInterval(slider);
});

startBtn.addEventListener("click", function () {
  clearInterval(slider);

  slider = setInterval(() => {
    currentIndex++;

    if (currentIndex === images.length) {
      currentIndex = 0;
    }

    img.src = images[currentIndex];
  }, 2000);
});

nextBtn.addEventListener("click", () => {
  clearInterval(slider);

  currentIndex++;

  if (currentIndex === images.length) {
    currentIndex = 0;
  }

  img.src = images[currentIndex];
});

previousBtn.addEventListener("click", () => {
  clearInterval(slider);

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }

  img.src = images[currentIndex];
});
