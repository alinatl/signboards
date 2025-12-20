document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('dots');
  document.querySelector('.carousel').appendChild(dotsContainer);

  let current = 0;

  // создаем точки
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      current = i;
      showSlide(current);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  function showSlide(next) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === next);
      dots[i].classList.toggle('active', i === next);
    });
  }

  // листание по клику на слайд
  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    });
  });
});
