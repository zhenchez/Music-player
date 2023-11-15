import { songs } from "./data/songs.js";
import { playlists } from "./data/playlists.js";
import { currentRadioId, radioMap } from "./radiosController.js";

export let soundMap = [];
export let currentSongId;
let currentVolume;
let timeInterval;
let shuffle;
let muted = false;

export function generatePlaylistSongs() {
  const playlistDOM = document.querySelector(".playlist-songs-container");
  let playlistHTML = "";
  playlists.forEach(list => {
    let bodyHTML = "";
    bodyHTML = `
    <div class="playlist-song">
              <div class="playlist-img-container">
                <img
                  class="playlist-thumbnail"
                  src=${list.img}
                />
              </div>

              <div class="playlist-song-details">
                <p class="playlist-song-title">${list.name}</p>
              </div>
              <div class="playlist-play-btt-container">
                <button class="playlist-play-btt">
                  <img class="playlist-play-icon" src="./icons/arrow_down.svg"/>
                </button>
              </div>
            </div>
    `;
    playlistHTML += bodyHTML;
    playlistDOM.innerHTML = playlistHTML;
  });
}
export function generateMainSongs(items) {
  const songsDOM = document.querySelector(".main-songs-grid");
  songsDOM.innerHTML = "";
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
          <p class="main-song-title" title="${item.title}">${item.title}</p>
          <p class="main-song-artist" title="${item.artist}">${item.artist}</p>
        </div>
      </div>
      `;
      mainSongsHTML += bodyHTML;
      songsDOM.innerHTML = mainSongsHTML;
    });
  }
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
      <button class="player-btt shuffle-btt">
        <img src="./icons/shuffle.svg" class="shuffle-icon player-icon" />
      </button>
      <button class="player-btt back-btt">
        <img src="./icons/back.svg" class="back-icon player-icon" />
      </button>
      <button class="player-btt pause-btt">
        <img src="./icons/pause.svg" class="pause-icon player-icon" />
      </button>
      <button class="player-btt next-btt">
        <img src="./icons/next.svg" class="next-icon player-icon" />
      </button>
      <button class="player-btt replay-btt">
      <img src="./icons/replay.svg" class="replay-icon player-icon" />
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
export function loadAllSongs() {
  songs.forEach(song => {
    soundMap[song.id] = new Howl({
      src: song.src,
      volume: 0.3,
    });
  });
}
export function addEventListenerVolume() {
  const volumeIcon = document.querySelector(".volume-icon");
  const volumeDOM = document.querySelector(".volume-range");
  document.querySelector(".volume-range").addEventListener("input", () => {
    let volume = parseFloat(volumeDOM.value);
    if (soundMap[currentSongId]) {
      soundMap[currentSongId].volume(volume);
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
    changeAllSongVolume();
  });
  document.querySelector(".volume-btt").addEventListener("click", () => {
    if (muted) {
      volumeDOM.value = 0.3;
      currentVolume = 0.3;
      changeAllSongVolume();
      volumeIcon.src = "./icons/volume.svg";
      muted = false;
    } else {
      volumeDOM.value = 0;
      currentVolume = 0;
      changeAllSongVolume();
      volumeIcon.src = "./icons/mute.svg";
      muted = true;
    }
  });
}
function addPlayerEventListeners(songId) {
  const shuffleBtt = document.querySelector(".shuffle-btt");
  const replayBtt = document.querySelector(".replay-btt");
  document.querySelector(".pause-btt").addEventListener("click", () => {
    const pauseDOM = document.querySelector(".pause-icon");
    if (soundMap[songId].playing()) {
      soundMap[songId].pause();
      pauseDOM.src = "../icons/play_arrow.svg";
    } else {
      soundMap[songId].play();
      pauseDOM.src = "../icons/pause.svg";
    }
  });
  document.querySelector(".back-btt").addEventListener("click", () => {
    const currentIndex = songs.findIndex(song => song.id === currentSongId);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    const previousSong = songs[previousIndex];
    playNewSong(previousSong);
  });

  document.querySelector(".next-btt").addEventListener("click", () => {
    const currentIndex = songs.findIndex(song => song.id === currentSongId);
    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];
    playNewSong(nextSong);
  });
  document.querySelector(".shuffle-btt").addEventListener("click", () => {
    shuffle = true;
    if (replayBtt.classList.contains("active-btt")) {
      replayBtt.classList.remove("active-btt");
      shuffleBtt.classList.add("active-btt");
    } else {
      shuffleBtt.classList.add("active-btt");
    }
    soundMap[currentSongId].off("end");
    soundMap[currentSongId].on("end", shuffleSongs);
  });
  document.querySelector(".replay-btt").addEventListener("click", () => {
    shuffle = false;
    if (shuffleBtt.classList.contains("active-btt")) {
      shuffleBtt.classList.remove("active-btt");
      replayBtt.classList.add("active-btt");
    } else {
      replayBtt.classList.add("active-btt");
    }
    soundMap[currentSongId].off("end");
    soundMap[currentSongId].on("end", replayCurrentSong);
  });
}
function shuffleSongs() {
  const currentIndex = songs.findIndex(song => song.id === currentSongId);
  const nextIndex = (currentIndex + 1) % songs.length;
  const nextSong = songs[nextIndex];
  playNewSong(nextSong);
}
function replayCurrentSong() {
  soundMap[currentSongId].play();
}
export function selectMatchingSong(songs, songId) {
  let matchingSong;
  songs.forEach(song => {
    if (song.id === songId) {
      matchingSong = song;
    }
  });
  return matchingSong;
}
function playOrPauseSong(songId) {
  if (currentRadioId && currentRadioId !== songId) {
    if (radioMap[currentRadioId].playing()) {
      radioMap[currentRadioId].pause();
    }
  }
  if (currentSongId && currentSongId !== songId) {
    if (soundMap[currentSongId].playing()) {
      soundMap[currentSongId].pause();
    }
  }

  if (soundMap[songId]) {
    if (soundMap[songId].playing()) {
      soundMap[songId].pause();
    } else {
      soundMap[songId].play();
    }
  } else {
    songs.forEach(song => {
      if (song.id === songId) {
        soundMap[songId] = new Howl({
          src: song.src,
          volume: currentVolume,
        });
      }
    });

    if (soundMap[songId]) {
      soundMap[songId].play();
    }
  }
}
function playNewSong(newSong) {
  const volumeDOM = document.querySelector(".volume-range");
  let volume = parseFloat(volumeDOM.value);
  currentVolume = volume;

  if (timeInterval) {
    clearInterval(timeInterval);
  }

  generatePlayer(newSong);
  addPlayerEventListeners(newSong.id);

  if (currentSongId && currentSongId !== newSong.id) {
    if (soundMap[currentSongId].playing()) {
      soundMap[currentSongId].pause();
    }
  }

  playOrPauseSong(newSong.id);

  addDuration(newSong.id);
  currentSongId = newSong.id;

  if (shuffle) {
    soundMap[currentSongId].on("end", shuffleSongs);
  }
}
function formatDuration(s) {
  const minutes = Math.floor(s / 60);
  const seconds = Math.floor(s % 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}
function addDuration(songId) {
  const duration = document.querySelector(".song-duration-range");
  const time = document.querySelector(".current-time");
  const songTime = document.querySelector(".song-time");

  duration.addEventListener("input", () => {
    soundMap[songId].seek(duration.value);
  });

  timeInterval = setInterval(() => {
    duration.value = String(soundMap[songId].seek());
    time.innerHTML = formatDuration(soundMap[songId].seek());
    duration.setAttribute("max", `${String(soundMap[songId].duration())}`);
    songTime.innerHTML = formatDuration(soundMap[songId].duration());
  });
}
function changeAllSongVolume() {
  for (const songId in soundMap) {
    soundMap[songId].volume(currentVolume);
  }
}
export function addEventListenerPlayBtt() {
  document.querySelectorAll(".play-btt").forEach(button => {
    button.addEventListener("click", () => {
      const { songId } = button.dataset;
      const matchingSong = selectMatchingSong(songs, songId);
      playNewSong(matchingSong);
    });
  });
}
