import { radios } from "./data/radios.js";
import {
  soundMap,
  currentSongId,
  selectMatchingSong,
} from "./songsController.js";

export let radioMap = [];
export let currentRadioId;
let currentVolume;
let muted = false;

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
function generatePlayer(song) {
  const playerRightDOM = document.querySelector(".player-left-section");
  const playerMiddleDOM = document.querySelector(".player-middle-section");
  let bodyHTML = `
    <div class="player-song-thumbnail">
      <img class="player-song-img" src=${song.img} />
    </div>
    <div class="player-song-details">
      <p class="player-song-title">${song.title}</p>
      <p class="player-song-artist">${song.artist}</p>
    </div>
  `;
  playerRightDOM.innerHTML = bodyHTML;

  bodyHTML = `
    <div class="player-btts">
      <button class="player-btt back-btt">
        <img src="./icons/back.svg" class="back-icon player-icon" />
      </button>
      <button class="player-btt pause-btt">
        <img src="./icons/pause.svg" class="pause-icon player-icon" />
      </button>
      <button class="player-btt next-btt">
        <img src="./icons/next.svg" class="next-icon player-icon" />
      </button>
    </div>
    <div class="song-duration">
      <div class="current-time"></div>
      <input class="song-duration-range" type="range" value="0" step="0.01"/>
      <div class="song-time"></div>
    </div>
  `;
  playerMiddleDOM.innerHTML = bodyHTML;
}
export function generateMainRadios(items) {
  const radioDOM = document.querySelector(".main-radios-grid");
  radioDOM.innerHTML = "";
  if (items.length > 0) {
    let mainSongsHTML = "";
    items.forEach(item => {
      let bodyHTML = "";
      bodyHTML = `
      <div class="main-songs-song">
        <div class="main-thumbnail-container">
          <img
            class="main-thumbnail-img"
            src=${item.img}
          />
          <button class="main-song-play-btt play-btt main-play-btt-${item.id}" data-song-id="${item.id}">
            <img class="main-song-play-icon main-play-icon-${item.id}" src="./icons/play_arrow.svg" />
          </button>
        </div>
  
        <div class="main-song-details">
          <p class="main-song-title">${item.title}</p>
          <p class="main-song-artist">${item.artist}</p>
        </div>
      </div>
      `;
      mainSongsHTML += bodyHTML;
      radioDOM.innerHTML = mainSongsHTML;
    });
  }
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
  document.querySelector(".back-btt").addEventListener("click", () => {
    const currentIndex = radios.findIndex(radio => radio.id === currentRadioId);
    const previousIndex = (currentIndex - 1 + radios.length) % radios.length;
    const previousRadio = radios[previousIndex];
    playNewRadio(previousRadio);
  });

  document.querySelector(".next-btt").addEventListener("click", () => {
    const currentIndex = radios.findIndex(radio => radio.id === currentRadioId);
    const nextIndex = (currentIndex + 1) % radios.length;
    const nextRadio = radios[nextIndex];
    playNewRadio(nextRadio);
  });
}
export function addEventListenerVolumeRadio() {
  const volumeIcon = document.querySelector(".volume-icon");
  const volumeDOM = document.querySelector(".volume-range");
  document.querySelector(".volume-range").addEventListener("input", () => {
    let volume = parseFloat(volumeDOM.value);
    if (radioMap[currentRadioId]) {
      radioMap[currentRadioId].volume(volume);
    }
    currentVolume = volume;
    if (currentVolume === 0) {
      volumeIcon.src = "./icons/mute.svg";
      muted = true;
    } else if (currentVolume <= 0.3 && currentVolume > 0) {
      volumeIcon.src = "./icons/volume_down.svg";
    } else {
      volumeIcon.src = "./icons/volume.svg";
    }
    changeAllRadioVolume();
  });
  document.querySelector(".volume-btt").addEventListener("click", () => {
    if (muted) {
      volumeDOM.value = 0.3;
      currentVolume = 0.3;
      changeAllRadioVolume();
      volumeIcon.src = "./icons/volume.svg";
      muted = false;
    } else {
      volumeDOM.value = 0;
      currentVolume = 0;
      changeAllRadioVolume();
      volumeIcon.src = "./icons/mute.svg";
      muted = true;
    }
  });
}
function changeAllRadioVolume() {
  for (const radioId in radioMap) {
    radioMap[radioId].volume(currentVolume);
  }
}
function playNewRadio(newRadio) {
  generatePlayer(newRadio);
  addPlayerEventListeners(newRadio.id);

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
  if (currentSongId && currentSongId !== radioId) {
    if (soundMap[currentSongId].playing()) {
      soundMap[currentSongId].pause();
    }
  }

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
