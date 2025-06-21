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
    const UpdateTimeAgo = DataManager.timeAgo(podcast.updated);

    const div = document.createElement("div");

    div.className = "w-[90vw] h-auto rounded-lg bg-white p-4 ";
    div.innerHTML = `<h1>     <div class="text-right">
        <button id="close-btn" class="text-red-500 font-bold">&times</button>
      </div>
      <h2 class="text-xl font-bold mb-2">${podcast.title}</h2>
     <div class="w-[95%] h-[70%] bg-light-grey mx-auto rounded-lg mb-2"> <picture><img class="w-full h-full object-cover rounded-2xl" src="${podcast.image}" ></picture> </div>
     <h3>Description</h3>
      <p><strong>Seasons:</strong> ${podcast.seasons}</p>
      <p><strong>Genres:</strong> ${genreNames}</p>
      <p class="text-sm text-gray-500">Updated ${UpdateTimeAgo}</p></h1> `;

    return div;
  },
};
