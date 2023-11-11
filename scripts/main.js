import {
  loadAllSongs,
  generateMainSongs,
  generatePlaylistSongs,
  addEventListenerPlayBtt,
} from "./songsController.js";

import { showEqualizer, createEqualizer } from "./equalizer.js";
import {
  loadAllRadios,
  generateMainRadios,
  addEventListenerRadioPlayBtt,
} from "./radiosController.js";

// Songs
loadAllSongs();
generateMainSongs();
generatePlaylistSongs();
addEventListenerPlayBtt();

// Equalizer
createEqualizer();
showEqualizer();

// Radios
loadAllRadios();
generateMainRadios();
addEventListenerRadioPlayBtt();
