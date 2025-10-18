<script>
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
let startX = 0;
let current = 0;

function showSlide(i) {
  slides.forEach(s => s.classList.remove('active'));
  slides[i].classList.add('active');
}

// свайпы
carousel.addEventListener('touchstart', e => startX = e.touches[0].clientX);
carousel.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) current = (current + 1) % slides.length;
  if (endX - startX > 50) current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});

// клики
carousel.addEventListener('click', () => {
  current = (current + 1) % slides.length;
  showSlide(current);
});
</script>
