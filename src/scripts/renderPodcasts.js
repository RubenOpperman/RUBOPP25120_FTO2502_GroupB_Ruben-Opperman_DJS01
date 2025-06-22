import { DataManager } from "./dataManager.js";
import { podcasts, genres, seasons } from "./initialData.js";
import { Modal, ModalRenderer } from "./renderModal.js";

export const PodcastRenderer = {
  render: (podcasts, container) => {
    container.innerHTML = "";

    podcasts.forEach((podcast) => {
      const card = PodcastRenderer.createCard(podcast);

      container.appendChild(card);
    });
  },
  createCard: (podcast) => {
    const genreNames = DataManager.getGenreIds(podcast.genres, genres).join(
      "  |  "
    );
    const UpdateTimeAgo = DataManager.timeAgo(podcast.updated);
    const div = document.createElement("div");
    div.className =
      "w-full  rounded-lg border-2 border-[#9CA3AF] bg-Podcast-card p-2 shadow-lg mx-auto font-serif ";
    div.innerHTML = `
    
    <div class="p-2">
    <div class="w-[95%] h-[70%]  mx-auto rounded-lg mb-2"><img class="w-auto h-auto object-cover  rounded-2xl" src="${podcast.image}" > </div>
      <h2 class="text-lg font-bold p-1">${podcast.title}</h2>
      <p class="text-sm text-gray-700 p-1 font-medium">${podcast.seasons} seasons</p>
      <div class="text-sm rounded-lg  bg-gray-300  p-2"> ${genreNames}</div>
      <p class="text-xs text-gray-500 p-1 font-semibold">Updated ${UpdateTimeAgo}</p>
    </div>
  `;
    Modal.openModal(div, podcast);
    Modal.closeModal(document.getElementById("close-btn"));
    return div;
  },
};
