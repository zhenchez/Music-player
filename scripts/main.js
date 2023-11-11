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

loadAllSongs();
generateMainSongs();
generatePlaylistSongs();
addEventListenerPlayBtt();
createEqualizer();
showEqualizer();
loadAllRadios();
generateMainRadios();
addEventListenerRadioPlayBtt();
