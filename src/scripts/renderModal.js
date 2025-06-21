import { DataManager } from "./dataManager.js";
import { podcasts, genres, seasons } from "./initialData.js";

export const Modal = {
  openModal: (container, podcast) => {
    container.addEventListener("click", function () {
      const modal = document.getElementById("podcast-modal");
      modal.innerHTML = "";
      const content = ModalRenderer.createModalCard(podcast);
      modal.appendChild(content);
      modal.showModal();
      const closeBtn = document.getElementById("close-btn");
      Modal.closeModal(closeBtn);
    });
  },

  closeModal: (closeBtn) => {
    closeBtn.addEventListener("click", function () {
      document.getElementById("podcast-modal").close();
    });
  },
};

export const ModalRenderer = {
  render: (podcast, container) => {
    container.innerHTML = "";

    const card = ModalRenderer.createModalCard(podcast);
    container.appendChild(card);
  },

  createModalCard: (podcast) => {
    const genreNames = DataManager.getGenreIds(podcast.genres, genres).join(
      "  |  "
    );

    const UpdateDate = new Date(podcast.updated);
    const formattedDate = UpdateDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const div = document.createElement("div");

    div.className = "max-w-[90vw] h-auto w-auto rounded-lg bg-white p-4 ";
    div.innerHTML = `<div class="text-right">
        <button id="close-btn" class="text-red-500 text-lg font-bold">&times</button>
      </div>
      <h2 class="text-2xl font-bold mb-2">${podcast.title}</h2>
     <div class="w-[95%] h-[70%] bg-light-grey mx-auto rounded-lg mb-2"> <img class="w-full h-full object-cover rounded-2xl" src="${podcast.image}" ></div>
     <h3 class="text-xl font-bold">Description</h3>
     <p> ${podcast.description}</p>
     <h3 class="text-xl font-bold">Genres:</h3>
     <p> ${genreNames}</p>
     <p class="text-sm text-gray-500">Last updated: ${formattedDate}</p></h1> 
    <p class="text-xl font-bold">Seasons</p>
    <div id="seasons-container">   </div>
`;

    ``;

    const seasonData = seasons.find((s) => s.id === podcast.id);

    const seasonsContainer = div.querySelector("#seasons-container");

    seasonData.seasonDetails.forEach((season) => {
      const seasonCard = document.createElement("div");
      seasonCard.className = "bg-gray-100 p-4 rounded-lg shadow-sm mb-2";

      seasonCard.innerHTML = `
      <h4 class="font-semibold text-lg">${season.title}</h4>
      <p class="text-sm text-gray-600">Episodes: ${season.episodes}</p>
    `;

      seasonsContainer.appendChild(seasonCard);
    });

    return div;
  },
};
