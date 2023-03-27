"use strict";

$(document).ready(function () {
  var multipleCardCarousel = document.querySelector(
    "#carouselExampleControlsWishlist"
  );
  if (window.matchMedia("(min-width: 768px)").matches) {
    var carouselWidth = $(".carousel-inner")[0].scrollWidth;
    var cardWidth = $(".carousel-item").width();
    var scrollPosition = 0;
    $("#carouselExampleControlsWishlist .carousel-control-next").on("click", function () {
      if (scrollPosition < carouselWidth - cardWidth) {
        scrollPosition += cardWidth;
        $("#carouselExampleControlsWishlist .carousel-inner").animate(
          { scrollLeft: scrollPosition },
          600
        );
      }
    });
      $("#carouselExampleControlsWishlist .carousel-control-prev").on("click", function () {
        if (scrollPosition > 0) {
          scrollPosition -= cardWidth;
          $("#carouselExampleControlsWishlist .carousel-inner").animate(
            { scrollLeft: scrollPosition },
            600
          );
        }
      });
    } else {
      $(multipleCardCarousel).addClass("slide");
    }
});