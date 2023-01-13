
$(document).ready(function(){
  var buttonColors = ["red", "blue", "green", "yellow"]
  var gamePattern = [];
  var userClickedPattern = [];
  var gameStarted = false;
  var level = 0;
  function nextSequence(){
    userClickedPattern = []
    level = level + 1;
    $("h1").text("Level "+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    /* $("#" + randomChosenColor).animate({opacity:0.2},"fast");
    $("#" + randomChosenColor).animate({opacity:1},"fast"); */
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
  }
  function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
  }
  function animatePress(currentColor){
    $("#"+ currentColor).toggleClass("pressed");
    setTimeout(function(){
      $("#"+ currentColor).toggleClass("pressed")
    },100)
  }

  $("div .btn").on("click",function(event){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    if(userClickedPattern.length == level && checkAnswer(userClickedPattern.length-1)){
      setTimeout(nextSequence,1000)
    }
    else if(checkAnswer(userClickedPattern.length-1) == false){
      wrongAnswer()
    }
    else if(userClickedPattern.length > level){
      wrongAnswer()
    }
  })
  $(document).keypress(function (event){
    if(!gameStarted){
    $("h1").text("Level 0");
    nextSequence();
    gameStarted = true;
  }}
    );
    function checkAnswer(index){
      if(userClickedPattern[index] == gamePattern[index]){
        return true;
      }
      else{
        return false;
      }
    }
    function wrongAnswer(){
      playSound("wrong")
      $("body").css("background-color", "red")
      setTimeout(function(){
        $("body").css("background-color", "#011F3F")
      },200)
      $("h1").text("Game Over! Please any key to restart");
      gameStarted = false;
      level = 0;
      gamePattern = []
    }
}


)
