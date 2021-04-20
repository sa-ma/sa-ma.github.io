// Cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  cursor.setAttribute(
    'style',
    'top: ' + (e.pageY - 10) + 'px; left: ' + (e.pageX - 10) + 'px;'
  );
});

document.addEventListener('click', () => {
  cursor.classList.add('expand');

  setTimeout(() => {
    cursor.classList.remove('expand');
  }, 500);
});

// About Toggle
const abtBtn = document.querySelector('#toggle-about');
const abtSection = document.querySelector('#expanded-about');
abtBtn.addEventListener('click', () => {
  console.log(abtSection.style.display);
  if (abtSection.style.display === '' || abtSection.style.display === 'none') {
    abtSection.style.display = 'block';
    abtBtn.innerHTML = `<span class="about-btn__text-line">Less about me</span><span
          class="about-btn__text-no-line">&nwarr;</span>`;
    return;
  }
  abtSection.style.display = 'none';
  abtBtn.innerHTML = `<span class="about-btn__text-line">More about me</span><span
          class="about-btn__text-no-line">&searr;</span>`;
  return;
});
