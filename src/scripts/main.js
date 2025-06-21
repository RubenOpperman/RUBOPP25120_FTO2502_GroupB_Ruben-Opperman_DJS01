import { podcasts, genres, seasons } from "./initialData.js";
import { PodcastRenderer } from "./renderPodcasts.js";
import { ModalRenderer } from "./renderModal.js";

const PodcastApp = {
  init: () => {
    const container = document.getElementById("podcast-container");

    PodcastRenderer.render(podcasts, container);
  },
};

PodcastApp.init();
