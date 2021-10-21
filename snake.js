
$(document).ready(function() {
    var gameSpace = document.getElementById("canvas");
    var stopButton = document.getElementById("stop");
    var leftButton = document.getElementById("left");
    var rightButton = document.getElementById("right");
    var clockButton = document.getElementById("here");
    

    var dir = "Right";
    var xPosition = 1;
    var yPosition = 150;
    var path = [];
    var running = 0;
    var game;
    var gameOver = false;
    var timer;

    var context = gameSpace.getContext("2d");
    context.strokeStyle = "#ff0000";
    context.lineWidth = 1;

    document.addEventListener("keydown", function() {

        if (running == 0 && !gameOver) {
            running = 1;
            context.beginPath();
            path = [];
            console.log("Trying to start game");
            startGame();
        }

        leftButton.onclick = function() {
            console.log("Turning left");
            switch (dir) {
                case "Up":
                    dir = "Left";
                    break;

                case "Down":
                    dir = "Right";
                    break;

                case "Right":
                    dir = "Up";
                    break;

                case "Left":
                    dir = "Down";
                    break;

                default:
                    dir = "Left";
            }
        }

        rightButton.onclick = function() {
            console.log("Turning right");
            switch (dir) {
                case "Up":
                    dir = "Right";
                    break;

                case "Down":
                    dir = "Left";
                    break;

                case "Right":
                    dir = "Down";
                    break;

                case "Left":
                    dir = "Up";
                    break;

                default:
                    dir = "Right";
            }
        }

        stopButton.onclick = function() {
            if (running == 1) {
                console.log("Stopping game");
                clearInterval(game);
                clearInterval(timer);
                running = 0;
                stopButton.innerText = "Start";
               
            } else {
                console.log("Resuming game");
                document.getElementById("stop")
                stopButton.innerText = "Stop";
                running = 1;
                startGame()
            }
        }
        clockButton.onclick = function()
        {
            stopButton.onclick();
        }

    });


    function startGame() {
        var i=2;
                timer = setInterval(function(){
                  document.getElementById("here").innerHTML=i++;
                },1000);
        console.log("Game started");
        game = setInterval(move, 25);
    }

    function move() {
        context.moveTo(xPosition, yPosition);
        // move the snake depending on what direction its going
        switch (dir) {
            case "Up":
                yPosition--;
                break;

            case "Down":
                yPosition++;
                break;

            case "Right":
                xPosition++;
                break;

            case "Left":
                xPosition--;
                break;

            default:
                xPosition++;
        }

        console.log("Moved " + dir);

        // check that snake has not touched a wall
        if (xPosition > 300 || xPosition < 0 || yPosition > 300 || yPosition < 0) {
            console.log("Hit wall");
            clearInterval(game);
            running = 0;
            gameOver = true;
            alert("DEATH HAS REACHED YOU, MY MORTAL SERPANT");
            clearInterval(game);
            clearInterval(timer);
            stopButton.innerHTML = "START";
        }

        // check that snake has not touched itself
        for (var i = 0; i < path.length; i++) {
            if (xPosition == path[i].x && yPosition == path[i].y) {
                console.log("Hit myself");
                clearInterval(game);
                running = 0;
                gameOver = true;
                alert("DEATH HAS REACHED YOU, MY MORTAL SERPANT");
                clearInterval(game);
                clearInterval(timer);
                stopButton.innerHTML = "START";

            }
        }

        context.lineTo(xPosition, yPosition);
        context.stroke();
        path.push({x: xPosition, y: yPosition});
    }

    
});