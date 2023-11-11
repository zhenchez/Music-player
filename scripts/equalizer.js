export function createEqualizer() {
  let canvas = document.getElementById("equalizer");
  let ctx = canvas.getContext("2d");
  //Inicialización de variables
  const analyser = Howler.ctx.createAnalyser();
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function loadEqualizer() {
    // Conexion del masterGain con el analyzer
    Howler.masterGain.connect(analyser);
    // Conecta analyzer en el destino de audio
    analyser.connect(Howler.ctx.destination);
    // Coloca la frecuencia de muestreo
    analyser.fftSize = 2048;
    // Get the Data array
    analyser.getByteTimeDomainData(dataArray);
  }

  const barWidth = (canvas.width / bufferLength) * 20;
  let barHeight;
  let x;

  function animateEqualizer() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animateEqualizer);
  }

  function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 2.5;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(i + (Math.PI * 2) / bufferLength);
      const hue = i * 1.2;
      ctx.fillStyle = "hsl(" + hue + ",100%, 50%)";
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
    if (equalizerPopup.classList.contains("show-equalizer")) {
      equalizerPopup.classList.remove("show-equalizer");
    } else {
      equalizerPopup.classList.add("show-equalizer");
    }
  });
}
