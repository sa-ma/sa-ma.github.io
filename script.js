window.onscroll = () => stickMe();
const navbar = document.getElementById('stickyMenu');
const sticky = navbar.offsetTop;
const stickMe = () => {
  window.pageYOffset >= sticky
    ? navbar.classList.add('sticky')
    : navbar.classList.remove('sticky');
};
