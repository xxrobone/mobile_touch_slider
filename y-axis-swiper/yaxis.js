console.log('js connected let swipe');

const slider = document.querySelector('.slide_container');

const slides = Array.from(document.querySelectorAll('.slide'));

console.log(slides);

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIdx = 0;

slides.forEach((slide, i) => {
  const slideImg = slide.querySelector('img');
  slideImg.addEventListener('dragstart', (e) => e.preventDefault());

  // touch events for mobile

  slide.addEventListener('touchstart', touchStart(i));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);

  // for mouse events
  slide.addEventListener('mousedown', touchStart(i));
  slide.addEventListener('mouseup', touchEnd);
  slide.addEventListener('mouseleave', touchEnd);
  slide.addEventListener('mousemove', touchMove);
});

function touchStart(i) {
  return function (e) {
    isDragging = true;
    currentIdx = i;
    startPos = getPosition(e);
    console.log('start ' + startPos);
    animationID = requestAnimationFrame(animation);
    slider.classList.add('grab');
  };
}

function touchEnd(i) {
  isDragging = false;
  cancelAnimationFrame(animationID);
  const moved = currentTranslate - prevTranslate;
  // check if slider is moved -100px and past last element
  if (moved < -100 && currentIdx < slides.length - 1) {
    currentIdx += 1;
  }
  // check if slider is moved +100px and is first element
  if (moved > 100 && currentIdx > 0) {
    currentIdx -= 1;
  }

  setPositionIdx();
  slider.classList.remove('grab');
}

function touchMove(e) {
  if (isDragging === true) {
    const currentPos = getPosition(e);
    currentTranslate = prevTranslate + currentPos - startPos;
    console.log('dragging');
  }
}

function getPosition(e) {
  return e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
}

function animation() {
  setSliderPos();
  if (isDragging) {
    requestAnimationFrame(animation);
  }
}

function setSliderPos() {
  slider.style.transform = `translateY(${currentTranslate}px)`;
}

function setPositionIdx() {
  currentTranslate = currentIdx * -window.innerHeight;
  prevTranslate = currentTranslate;
  setSliderPos();
}
