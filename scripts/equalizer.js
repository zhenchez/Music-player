export function createEqualizer() {
  const canvas = document.getElementById("equalizer");
  const ctx = canvas.getContext("2d");
  const analyser = Howler.ctx.createAnalyser();
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function loadEqualizer() {
    Howler.masterGain.connect(analyser);
    analyser.connect(Howler.ctx.destination);
    analyser.fftSize = 2048;
    analyser.getByteTimeDomainData(dataArray);
  }

  const barWidth = (canvas.width / bufferLength) * 20;
  let x = 0;

  function animateEqualizer() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualiser(bufferLength, x, barWidth, dataArray);
    requestAnimationFrame(animateEqualizer);
  }

  function drawVisualiser(bufferLength, x, barWidth, dataArray) {
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i] / 2.5;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(i + (Math.PI * 2) / bufferLength);
      const hue = i;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.fillRect(0, 0, barWidth, barHeight);
      x += barHeight;
      ctx.restore();
    }
  }

  loadEqualizer();
  animateEqualizer();
}

export function showEqualizer() {
  const equalizerBtt = document.querySelector(".equalizer-icon");
  const equalizerPopup = document.querySelector(".equalizer-popup");
  equalizerBtt.addEventListener("click", () => {
    equalizerPopup.classList.toggle("show-equalizer");
  });
}
