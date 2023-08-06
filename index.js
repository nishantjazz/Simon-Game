var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function(){
 if(!started){   
    nextSequence();
    started = true;
 }
})




function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    makeSound(randomChosenColor);
    level++;
    $("h1").html("level " + level);
}


function makeSound(soundName){
var audio = new Audio("./sounds/" + soundName + ".mp3");
audio.play();
}

$(".btn").on("click", function(){
    var userChosenColor = this.id;
    userClickedButton(userChosenColor);
})

function userClickedButton(id){
    userClickedPattern.push(id);
    animatePress(id);
    makeSound(id);
    checkAnswer(userClickedPattern.length - 1);

}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");

   setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
   }, 100);

}

function gameOver(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
        $("h1").html("Game Over, Press Any Key to Restart");
    }, 200);
    makeSound("wrong");
}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else{
        gameOver();
        startOver();
    }

    

}