import {
  loadAllSongs,
  generateMainSongs,
  generatePlaylistSongs,
  addEventListenerPlayBtt,
  addEventListenerVolume,
} from "./songsController.js";
import { showEqualizer, createEqualizer } from "./equalizer.js";
import {
  loadAllRadios,
  generateMainRadios,
  addEventListenerRadioPlayBtt,
  addEventListenerVolumeRadio,
} from "./radiosController.js";
import { generateArtistsHTML } from "./artistController.js";
import { songs } from "./data/songs.js";
import { artists } from "./data/artists.js";
import { radios } from "./data/radios.js";

const songsCat = [...new Set(songs.map(song => song))];
const artistsCat = [...new Set(artists.map(artist => artist))];
const radiosCat = [...new Set(radios.map(radio => radio))];

// Songs
function generateSongs(item) {
  generateMainSongs(item);
  generatePlaylistSongs();
  addEventListenerPlayBtt();
  addEventListenerVolume();
}

// Equalizer
function generateEq() {
  createEqualizer();
  showEqualizer();
}

// Artist
function generateArtists(item) {
  generateArtistsHTML(item);
}

// Radios
function generateRadios(items) {
  generateMainRadios(items);
  addEventListenerRadioPlayBtt();
  addEventListenerVolumeRadio();
}

function toggleVisibility(filteredData, headerSelector, gridSelector) {
  const header = document.querySelector(headerSelector);
  const grid = document.querySelector(gridSelector);

  if (filteredData.length === 0) {
    header.classList.add("hiden");
    grid.classList.add("hiden");
  } else {
    header.classList.remove("hiden");
    grid.classList.remove("hiden");
  }
}

function handleSearchBar() {
  const searchData = document
    .querySelector(".search-bar-input")
    .value.toLowerCase();
  const filteredSong = songsCat.filter(
    song =>
      song.title.toLocaleLowerCase().includes(searchData) ||
      song.artist.toLocaleLowerCase().includes(searchData)
  );
  const filteredArtist = artistsCat.filter(
    artist =>
      artist.name.toLocaleLowerCase().includes(searchData) ||
      artist.genre.toLocaleLowerCase().includes(searchData)
  );
  const filteredRadio = radiosCat.filter(
    radio =>
      radio.title.toLocaleLowerCase().includes(searchData) ||
      radio.artist.toLocaleLowerCase().includes(searchData)
  );

  generateSongs(filteredSong);
  generateArtists(filteredArtist);
  generateRadios(filteredRadio);
  toggleVisibility(filteredSong, ".main-songs-header", ".main-songs-grid");
  toggleVisibility(filteredArtist, "#main-artist-header", ".main-artists-grid");
  toggleVisibility(filteredRadio, "#main-radio-header", ".main-radios-grid");
}

document
  .querySelector(".search-bar-input")
  .addEventListener("keyup", handleSearchBar);
document.querySelector(".clear-search-bar").addEventListener("click", () => {
  document.querySelector(".search-bar-input").value = "";
  handleSearchBar();
});

loadAllSongs();
loadAllRadios();
generateSongs(songs);
generateEq();
generateArtists(artists);
generateRadios(radios);
