// 1. Исчезающий хедер
let lastScroll = 0;
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 100) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }
  lastScroll = currentScroll;
});

<!--// 2. Авто-карусель-->
<!--const slides = document.querySelectorAll('.slide');-->
<!--let currentSlide = 0;-->
<!--setInterval(() => {-->
<!--  slides[currentSlide].classList.remove('active');-->
<!--  currentSlide = (currentSlide + 1) % slides.length;-->
<!--  slides[currentSlide].classList.add('active');-->
<!--}, 5000);-->


// 2. Авто-карусель с поддержкой свайпов
const slides = document.querySelectorAll('.slide');
const carouselContainer = document.querySelector('.carousel');
let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;

function showSlide(index) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Автопереключение
let autoSlideInterval = setInterval(nextSlide, 5000);

// Обработка свайпов
carouselContainer.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
  clearInterval(autoSlideInterval); // Останавливаем авто-слайд при касании
});

carouselContainer.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
  // Перезапускаем авто-слайд
  autoSlideInterval = setInterval(nextSlide, 5000);
});

function handleSwipe() {
  const swipeDistance = touchStartX - touchEndX;
  if (swipeDistance > 50) {
    nextSlide(); // Свайп влево
  } else if (swipeDistance < -50) {
    prevSlide(); // Свайп вправо
  }
}

// 3. Лайтбокс
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('click', () => {
    if(img.closest('.lightbox')) return;
    lbImg.src = img.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// 4. Меню
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
burgerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  mobileMenu.classList.toggle('open');
});
document.addEventListener('click', () => mobileMenu.classList.remove('open'));


<!--загрузка рандомной ссылки-->
const randomLink = document.getElementById('randomLink');

fetch('../pages.json') // или '/pages.js', если подключён как <script src="pages.js">
  .then(res => res.json())
  .then(pages => {
    // выбираем случайную ссылку при загрузке
    const randomIndex = Math.floor(Math.random() * pages.length);
    randomLink.href = pages[randomIndex];

    // опционально: при клике менять на новую случайную ссылку
    randomLink.addEventListener('click', (e) => {
      const newIndex = Math.floor(Math.random() * pages.length);
      randomLink.href = pages[newIndex];
    });
  })
  .catch(err => console.error(err));
