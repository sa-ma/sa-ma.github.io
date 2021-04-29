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

// Copyright year so that I don't have to update it yearly
const copyrightYear = document.querySelector('#copyright-year');
const date = new Date();
copyrightYear.innerHTML = date.getFullYear();

// Colorful Console Message
console.log(
  '%c HIRE ME!!',
  'font-weight: bold; font-size: 50px;color: #ff9800; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)'
);
