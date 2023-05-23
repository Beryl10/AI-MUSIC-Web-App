song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
status1 = "";
status2 = "";

function preload() 
{
   song_1 = loadSound("music1.mp3");
   song_2 = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0 , 0, 600, 500);

    status1 = song_1.isPlaying();
    status2 = song_2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX , leftWristY , 20);
        song_2.stop();
        if(status1 == false)
        {
            song_1.play();
            document.getElementById("play").innerHTML = "Song - Mujhko Tum Gale Laga Lo";
        }
    }
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX , rightWristY , 20);
        song_1.stop();
        if(status2 == false)
        {
            song_2.play();
            document.getElementById("play").innerHTML = "Song - Mere Samne Vali Khidki Mein";
        }
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {   
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = "+ rightWristY);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
    }
}