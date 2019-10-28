var quiz;
var name = "Name";
var currentQuestion = -1;
var quizLength = 0;
var numAns = 0;
var userAnswers = [];
var userJSON;
var score = 0;
var titles;
var selectedQuiz = 0;
var ids;
var notificationFadeTime = 3000;

$('#title').text("Dynamic Quiz");
  $('#title').hide().fadeIn("slow");
  $('#nameForm').hide().fadeIn("slow");
  $('#description').hide();
  $('#answerChoices').hide();
  $('#previousQuestion').hide();
  $('#nextQuestion').hide();
  $('#answerWarning').hide();
  $('#nameFormWarning').hide();
  $('#scoreTable').hide();
  $('#userTable').hide();
  $('#tenScores').hide();
  $('#home').hide();
  $('#ajaxloading').hide();
  $('#backHome').hide();
  $('#quizSuccess').hide();
  $('#quizWarning').hide();
  $('#placeholderWarning').hide();
  $('#placeholderSuccess').hide();
  $('#reload').hide();
  $('#editQuiz').hide();
  $('#piechart').hide();
  $('[data-hide]').on("click", function() {
    $('#nameFormWarning').hide();
    $('#answerWarning').hide();
    $('#quizSuccess').hide();
    $('#quizWarning').hide();
    $('#placeholderWarning').hide();
    $('#placeholderSuccess').hide();
  });


// Initial setup
$(document).ready(function() {
  $.getJSON('titlesandids')
  .done(function (data) {
    // console.log(data);
    titles = data.slice(0,data.length/2);
    ids = data.slice(data.length/2);
    if (titles === undefined) {
      $('#ajaxloading').text("Sorry, we cannot load the quizzes. Please reload the page to try again.");
      $('#ajaxloading').show();
      $('#reload').show();
    }
  })
  .fail(function() {
    $('#ajaxloading').text("Sorry, we cannot load the quizzes. Please reload the page to try again.");
    $('#ajaxloading').show();
    $('#reload').show();
  });

  
  //start quiz
  document.getElementById("start_quiz").addEventListener("click", function(e) {
    // console.log("start");
    $('#editQuiz').hide();
    e.preventDefault();
    nameForm();
  });

  // After name is submitted on initial screen
function nameForm(){
    name = $('#nameForm').serializeArray()[0]["value"];
    if (name.length === 0) {
      $('#firstName').css({ "border": '1px solid #FF0000'});
      $('#nameFormWarning').show();
      $("#nameFormWarning").fadeTo(notificationFadeTime, 500).slideUp(500, function(){
        $("#nameFormWarning").hide();
      });
    }
    else {
      $('#firstName').css({ "border": '1px solid #ccc'});
      $('#nameFormWarning').hide();
      $('#nameForm').hide();
      $('#welcome').text("Welcome " + name + "!");
      $('#welcome').prepend('<a href="/"><img src="static/HomeIcon.png" width="38" height="38" id="homeImg" alt=""></a>');
      selectedQuiz = ids[titles.indexOf($('#titlesDropdown option:selected').text())];
      var selectedTitle = $('#titlesDropdown option:selected').text();
      $('#title').text(selectedTitle);
      document.title = selectedTitle;
      loadQuiz(selectedQuiz);
    }
  }

  // load titles in allQuizzes
function loadTitles(){
    $.getJSON('titlesandids')

    .done(function (data) {
      $('#ajaxloading').hide();
      $('#backHome').hide();
      $('#reload').hide();
      titles = data.slice(0,data.length/2);
      ids = data.slice(data.length/2);
      if (titles === undefined) {
        $('#ajaxloading').text("Sorry, we cannot load the quizzes. Please reload the page to try again.");
        $('#ajaxloading').show();
        $('#reload').show();
      }
      else {
        $("#titlesDropdown").empty();
        for (var i = 0; i < titles.length; i++) {
          var select = document.getElementById("titlesDropdown");
          var option = document.createElement("option");
          var aTag = document.createElement("a");
          option.appendChild(document.createTextNode(titles[i]));
          select.appendChild(option);
        }
      }
    })

    .fail(function() {
      $('#ajaxloading').text("Sorry, we cannot load the quizzes. Please reload the page to try again.");
      $('#ajaxloading').show();
      $('#reload').show();
    })
    
    .always(function() {
      $('#reload').on('click', function(e){
        e.preventDefault();
        loadTitles();
      });
    });
  }
 
  function loadQuiz(target){
    $.getJSON('quiz/' + target)
    .done(function (data) {
      $('#ajaxloading').hide();
      $('#backHome').hide();
      $('#reload').hide();
      quiz = data;
      if (quiz["questions"] === undefined) {
        $('#ajaxloading').text("Sorry, we cannot load the quiz. Please reload the page to try again.");
        $('#ajaxloading').show();
        $('#reload').show();
        $('#backHome').show();
      }
      else {
        quizLength = quiz["questions"].length;
        $('#nextQuestion').show();
        $('#answerChoices').show();
        $('#description').text(quiz["description"]);
        $('#description').show();
        nextQuestion();
      }
    })
    .fail(function() {
      $('#ajaxloading').text("Sorry, we cannot load the quiz. Please reload the page to try again.");
      $('#ajaxloading').show();
      $('#reload').show();
      $('#backHome').show();
    })
    .always(function() {
      $('#reload').on('click', function(e){
        e.preventDefault();
        loadQuiz(target);
      });
    });
  }