window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    document.getElementById("navbar-extra").style.boxShadow = "0px 3px 3px rgba(0, 0, 0, 0.102)";
  } else {
    document.getElementById("navbar-extra").style.boxShadow = "none";
  }
} 