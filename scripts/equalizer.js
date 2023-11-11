export function createEqualizer() {
  let analyser;
  let bufferLength;
  let dataArray;
  let canvas = document.getElementById("equalizer");
  let ctx = canvas.getContext("2d");
  //Inicialización de variables
  analyser = Howler.ctx.createAnalyser();
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

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

  function animateEqualizer() {
    // Limpia el lienzo del canvas para pintar de nuevo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Obtiene los datos de frecuencia del audio
    analyser.getByteFrequencyData(dataArray);
    // Dibuja las barras del ecualizador
    let barWidth = (canvas.width / bufferLength) * 10;
    let barSpacing = 4;
    let barHeight;
    // Recorre el array de datos de frecuencia y dibuja las barras
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      /*       ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(i + (Math.PI * 2) / bufferLength);
      const red = (i * barHeight) / 30;
      const green = i / 2;
      const blue = barHeight;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, barWidth, 15);
      ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
      ctx.fillRect(0, 0, barWidth, barHeight);
      x += barWidth;
      ctx.restore(); */
      let x = i * (barWidth + barSpacing);
      let y = canvas.height - barHeight;
      ctx.fillStyle = "black"; // Cambia el color de las barras según tu preferencia
      ctx.arc(0, 0, 50, 0, 2 * Math.PI, false);
      //Pinta la barra actual
      ctx.fillRect(x, y, barWidth, barHeight);
    }
    // Repite la animación
    let animationFrame = requestAnimationFrame(animateEqualizer);
  }

  //Llamamos una vez a ambas funciones y en este orden
  loadEqualizer();
  animateEqualizer();
}
export function createEqualizer1() {
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
