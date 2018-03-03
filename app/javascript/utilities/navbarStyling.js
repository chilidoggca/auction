export function navbarStyling () {
  const myNav = document.querySelector('nav.navbar');
  window.onscroll = function () {
    "use strict";
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
      myNav.classList.add("nav-colored");
    }
    else {
      myNav.classList.remove("nav-colored");
    }
  };

}
