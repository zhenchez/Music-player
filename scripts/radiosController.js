import { radios } from "./data/radios.js";
import { selectMatchingSong, generatePlayer } from "./songsController.js";

let radioMap = [];
let currentRadioId;
let currentVolume;

export function loadAllRadios() {
  radios.forEach(radio => {
    radioMap[radio.id] = new Howl({
      src: radio.src,
      volume: 0.5,
      html5: true,
      format: ["aac"],
    });
  });
}
export function generateMainRadios() {
  const radioDOM = document.querySelector(".main-radios-grid");
  let mainSongsHTML = "";
  radios.forEach(radio => {
    let bodyHTML = "";
    bodyHTML = `
    <div class="main-songs-song">
      <div class="main-thumbnail-container">
        <img
          class="main-thumbnail-img"
          src=${radio.img}
        />
        <button class="main-song-play-btt play-btt main-play-btt-${radio.id}" data-song-id="${radio.id}">
          <img class="main-song-play-icon main-play-icon-${radio.id}" src="./icons/play_arrow.svg" />
        </button>
      </div>

      <div class="main-song-details">
        <p class="main-song-title">${radio.title}</p>
        <p class="main-song-artist">${radio.artist}</p>
      </div>
    </div>
    `;
    mainSongsHTML += bodyHTML;
    radioDOM.innerHTML = mainSongsHTML;
  });
}
function addPlayerEventListeners(songId) {
  document.querySelector(".pause-btt").addEventListener("click", () => {
    const pauseDOM = document.querySelector(".pause-icon");
    if (radioMap[songId].playing()) {
      radioMap[songId].pause();
      pauseDOM.src = "../icons/play_arrow.svg";
    } else {
      radioMap[songId].play();
      pauseDOM.src = "../icons/pause.svg";
    }
  });
}
function playNewRadio(newRadio) {
  const volumeDOM = document.querySelector(".volume-range");
  let volume = parseFloat(volumeDOM.value);
  currentVolume = volume;

  generatePlayer(newRadio);
  addPlayerEventListeners(newRadio.id);

  document.querySelector(".volume-range").addEventListener("input", () => {
    volume = parseFloat(volumeDOM.value);
    radioMap[currentRadioId].volume(volume);
    currentVolume = volume;
    changeAllSongVolume();
  });

  if (currentRadioId && currentRadioId !== newRadio.id) {
    if (radioMap[currentRadioId].playing()) {
      radioMap[currentRadioId].pause();
    }
  }

  playOrPauseSong(newRadio.id);
  currentRadioId = newRadio.id;
}
export function addEventListenerRadioPlayBtt() {
  document.querySelectorAll(".play-btt").forEach(button => {
    button.addEventListener("click", () => {
      const { songId } = button.dataset;
      const matchingSong = selectMatchingSong(radios, songId);
      playNewRadio(matchingSong);
    });
  });
}
function playOrPauseSong(radioId) {
  if (currentRadioId && currentRadioId !== radioId) {
    if (radioMap[currentRadioId].playing()) {
      radioMap[currentRadioId].pause();
    }
  }

  if (radioMap[radioId]) {
    if (radioMap[radioId].playing()) {
      radioMap[radioId].pause();
    } else {
      radioMap[radioId].play();
    }
  } else {
    radios.forEach(radio => {
      if (radio.id === radioId) {
        radioMap[radioId] = new Howl({
          src: radio.src,
          volume: currentVolume,
        });
      }
    });

    if (radioMap[radioId]) {
      radioMap[radioId].play();
    }
  }
}
