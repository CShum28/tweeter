$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    let textLength = $(this).val().length;
    let textLimit = 140 - textLength;
    let counterElement = $(".counter");
    counterElement.val(textLimit);
    if (textLimit < 0) {
      counterElement.addClass("red");
    } else {
      counterElement.removeClass("red");
    }
  });

  // Top of page button
  // Hide the topbutton on page load/ready.
  $(".top-of-page").hide();

  // Check to see if the window is top if not then display button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".top-of-page").show();
    } else {
      $(".top-of-page").hide();
    }
  });

  // Goes back to top of page when clicked
  $(".top-of-page").click(function () {
    window.scrollTo(0, 0);
  });
});
