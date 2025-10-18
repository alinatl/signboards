<script>
const slides = document.querySelectorAll('.slide');
let current = 0;

function showSlide(i) {
  slides.forEach(s => s.classList.remove('active'));
  slides[i].classList.add('active');
}

// переход на следующий кадр по клику на любой слайд
slides.forEach(slide => {
  slide.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });
});
</script>