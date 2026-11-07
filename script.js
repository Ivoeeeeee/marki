const photos = [
  {
    src: "c2071628-bb00-4d47-b90e-083e48dcfd0b.jpg",
    alt: "Close-up portrait in a patterned shirt",
    caption: "The everyday uniform",
  },
  {
    src: "5c56870a-b6a2-4902-b2d1-7481b2c17245.jpg",
    alt: "Person resting on a bed in warm afternoon light",
    caption: "A soft landing",
  },
  {
    src: "5c7a4194-01c3-4586-bc49-f023c6105270.jpg",
    alt: "Smiling close-up portrait",
    caption: "Nothing to prove",
  },
  {
    src: "1a8b0fc2-54c6-403a-a83f-4b8813ec55a6.jpg",
    alt: "Person sleeping in a bright room",
    caption: "Out of office",
  },
  {
    src: "b70f2ecf-a240-4833-b60c-fb11023aee76.jpg",
    alt: "Person smiling in a candid portrait",
    caption: "A bright little moment",
  },
];

const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
const lightboxCount = lightbox.querySelector(".lightbox-count");
const cards = document.querySelectorAll(".photo-card");
let activeIndex = 0;

function showPhoto(index) {
  activeIndex = (index + photos.length) % photos.length;
  const photo = photos[activeIndex];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxCaption.textContent = photo.caption;
  lightboxCount.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
}

function openLightbox(index) {
  showPhoto(index);
  lightbox.hidden = false;
  body.classList.add("lightbox-open");
  lightbox.querySelector(".lightbox-close").focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  body.classList.remove("lightbox-open");
}

cards.forEach((card) => {
  card.addEventListener("click", () => openLightbox(Number(card.dataset.index)));
});

lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showPhoto(activeIndex - 1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showPhoto(activeIndex + 1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showPhoto(activeIndex - 1);
  if (event.key === "ArrowRight") showPhoto(activeIndex + 1);
});

themeToggle.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark");
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.querySelector(".theme-icon").textContent = isDark ? "☾" : "☼";
});
