import { DataManager } from "./dataManager.js";
import { genres } from "./initialData.js";
import { Modal } from "./renderModal.js";

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
      "  /  "
    );
    const genreList = genreNames.split(" / ");
    const UpdateTimeAgo = DataManager.timeAgo(podcast.updated);
    const PodcastCardContainer = document.createElement("div");
    PodcastCardContainer.className =
      "w-full  rounded-lg border-2 border-[#9CA3AF] bg-Podcast-card p-2 shadow-lg mx-auto font-serif ";
    PodcastCardContainer.innerHTML = `
    
    <div class="p-2">
    <div class="w-[95%] h-[70%]  mx-auto rounded-lg mb-2"><img class="w-auto h-auto object-cover  rounded-2xl" src="${podcast.image}" > </div>
      <h2 class="text-lg font-bold p-1">${podcast.title}</h2>

<div class="flex mb-2">
    <image class="w-5 pr-2 h-auto" src="/assets/gray-calendar-25911.svg">
      <p class="text-sm text-gray-700 p-1 font-medium">${podcast.seasons} seasons</p>
</div>




     <div id="genre-container" class="flex flex-wrap gap-2 mb-2"></div>

      <p class="text-xs text-gray-500 p-1 font-semibold">Updated ${UpdateTimeAgo}</p>
    </div>
  `;
    const genresContainer =
      PodcastCardContainer.querySelector("#genre-container");

    genreList.forEach((genre) => {
      const genreTag = document.createElement("span");
      genreTag.className =
        "bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium";
      genreTag.textContent = genre;
      genresContainer.appendChild(genreTag);
    });

    Modal.openModal(PodcastCardContainer, podcast);

    return PodcastCardContainer;
  },
};
