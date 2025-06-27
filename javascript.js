const bars = [
  { id: 'bar-1', value: 100, decayRate: 0.5 },
  { id: 'bar-2', value: 100, decayRate: 0.3 },
  { id: 'bar-3', value: 100, decayRate: 0.2 }
];

let gameOver = false;

function updateBars() {
  if (gameOver) return;

  let lowestValue = 100;
  let showSpeechBubble = false;

  bars.forEach((bar) => {
    bar.value -= bar.decayRate;
    if (bar.value < 0) bar.value = 0;

    const barElement = document.getElementById(bar.id);
    barElement.style.width = `${bar.value}%`;

    if (bar.value < 25) {
      barElement.style.backgroundColor = 'red';
      showSpeechBubble = true;
    } else if (bar.value < 50) {
      barElement.style.backgroundColor = 'orange';
      showSpeechBubble = true;
    } else {
      barElement.style.backgroundColor = 'green';
    }

    if (bar.value < lowestValue) {
      lowestValue = bar.value;
    }

    if (bar.value === 0 && !gameOver) {
      endGame();
    }
  });

  document.getElementById("speech-bubble").hidden = !showSpeechBubble;

  const tylerImg = document.getElementById("tyler-image");
  if (lowestValue < 25) {
    tylerImg.src = "img/tylerboos.png";
  } else if (lowestValue < 50) {
    tylerImg.src = "img/tylerverrast.png";
  } else {
    tylerImg.src = "img/tylernormal.png";
  }
}

function boostBar(barIndex) {
  if (gameOver) return;

  bars[barIndex - 1].value += 20;
  if (bars[barIndex - 1].value > 100) {
    bars[barIndex - 1].value = 100;
  }

  let sound;
  let start = 0;
  let duration = 4000;
// chat gpt // 
// prompt: hoe kan ik audio toevoegen dat afspeelt als je op een knop drukt // 
  if (barIndex === 1) {
    sound = document.getElementById('optreden-sound');
    start = 20;
    duration = 6500;
  } else if (barIndex === 2) {
    sound = document.getElementById('mode-sound');
    start = 36;
    duration = 6000;
  } else if (barIndex === 3) {
    sound = document.getElementById('grammy-sound');
    start = 8;
    duration = 5000;
  }

  if (sound) {
    sound.currentTime = start;
    sound.play();
    setTimeout(() => {
      sound.pause();
      sound.currentTime = 0;
    }, duration);
  }
}

// chat gpt // 

function endGame() {
  gameOver = true;
  document.getElementById("game-over").style.display = "flex";

  const sound = document.getElementById("gameover-sound");
  if (sound) {
    sound.currentTime = 35;
    sound.play();

    setTimeout(() => {
      sound.pause();
      sound.currentTime = 0;
    }, 17000);
  }

  setTimeout(() => {
    restartGame();
  }, 5000);
}

function restartGame() {
  bars.forEach((bar) => {
    bar.value = 100;
    const barElement = document.getElementById(bar.id);
    barElement.style.width = "100%";
    barElement.style.backgroundColor = "green";
  });

  document.getElementById("tyler-image").src = "img/tylernormal.png";
  document.getElementById("speech-bubble").hidden = true;
  document.getElementById("game-over").style.display = "none";

  gameOver = false;
}

setInterval(updateBars, 250);
