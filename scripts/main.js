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

// Songs
loadAllSongs();
generateMainSongs();
generatePlaylistSongs();
addEventListenerPlayBtt();
addEventListenerVolume();

// Equalizer
createEqualizer();
showEqualizer();

// Radios
loadAllRadios();
generateMainRadios();
addEventListenerRadioPlayBtt();
addEventListenerVolumeRadio();
