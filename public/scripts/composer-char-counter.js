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
});
