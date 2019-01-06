function toogleDropdown(){
    let navbarToogle = document.querySelector("#navbar-toogle");
    if (navbarToogle.className === 'topnav') {
        navbarToogle.className += ' responsive';
    }else{
        navbarToogle.className='topnav';
    }
}

function displayOn(){
    document.querySelector("#overlay").style.display="block";
}

function displayOff(){
    document.querySelector("#overlay").style.display="none";
}

//  Credit to Vincent Garreu for particleJS
// https://vincentgarreau.com/particles.js/

// I'll get back to this section when I'm done with jquery
// Credit to Rishabh http://codetheory.in/change-active-state-links-sticky-navigation-scroll/




var sections = $('section')
  , nav = $('nav')
  , nav_height = nav.outerHeight();

  if (nav.length) {
    var contentNav = nav.offset().top;
   
  
  
$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();
 
  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();
 
    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('active');
      sections.removeClass('active');
 
      $(this).addClass('active');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
    }
  });
});

nav.find('a').on('click', function () {
    var $el = $(this)
      , id = $el.attr('href');
   
    $('html, body').animate({
      scrollTop: $(id).offset().top - nav_height
    }, 500);
   
    return false;
  });
}