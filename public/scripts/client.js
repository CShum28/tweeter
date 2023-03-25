/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // function to fetch tweets from /tweets page

  const loadtweets = function () {
    return $.ajax({
      type: "GET",
      url: "http://localhost:8080/tweets",
      success: function (result) {
        renderTweets(result);
      },
    });
  };

  const renderTweets = function (tweets) {
    // loop through object and append createTweetElemnt into .container
    for (const tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  };

  const customEscape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweetObj) => {
    return `
      <article class="tweet-layout">
        <header class="flex-row-spaced">
          <span class="tweet-icon flex-row-spaced">
            <img src="${tweetObj.user.avatars}" />
            <p>${tweetObj.user.name}</p>
          </span>
          <p>${tweetObj.user.handle}</p>
        </header>
        <div>
          <p class="tweet-content">${customEscape(tweetObj.content.text)}</p>
        </div>
        <footer class="tweet-foot flex-row-spaced">
          <p>${timeago.format(tweetObj.created_at)}</p>
          <div class="tweet-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
  };

  loadtweets();

  // Submit form handler

  $("#tweet-form").submit(function (event) {
    event.preventDefault(); // presents the default behaviour of the form
    let textLength = $("#tweet-text").val().length;
    if (textLength < 1) {
      $("#error-message").slideUp();
      $("#error-message")
        .html("&#x26A0 Please enter in some text! &#x26A0")
        .slideDown();
    } else if (textLength > 140) {
      $("#error-message").slideUp();
      $("#error-message")
        .html(
          "&#x26A0 The max amount of text is 140 per tweet! Please remove a few characters! &#x26A0"
        )
        .slideDown();
    } else {
      //Make a AJAX Call
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: $(this).serialize(),
        success: () => {
          $("#error-message").slideUp();
          $("#tweet-form")[0].reset();
          $("#tweets-container").empty();
          loadtweets();
        },
      });
    }
  });

  // Toggle the form

  $(".toggle-form-button").click(function () {
    $(".new-tweet").toggle("slow");
  });
});
