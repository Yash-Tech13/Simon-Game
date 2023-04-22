var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
    if(!started) {
        nextSequence();
        started = true;
    }
})

function startOver() {
    level = 0;
    gamePattern.length = 0;
    started = false;
}

function nextSequence() {
    $("h1#level-title").text("Level "+level);

    userClickedPattern.length = 0;
    var randomNumber = Math.floor(Math.random() * 4);
    var colorChosen = buttonColors[randomNumber];
    gamePattern.push(colorChosen);

    $("#"+colorChosen).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(colorChosen);

    level++;
}

$(".btn").click(function() {
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) { 
    
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if(userClickedPattern.length == gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200)
        $("h1#level-title").text("Game Over! Press Any Key to Restart");
        startOver();
    }
} 

function playSound(colorChosen) {
    var audio = new Audio("sounds/" + colorChosen + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#"+color).addClass("pressed");

    setTimeout(function() {
        $("#"+color).removeClass("pressed");
    },100);
}

