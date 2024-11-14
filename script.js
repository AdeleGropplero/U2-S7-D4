const url = "https://api.pexels.com/v1/search?query=";
const yourApiKey = "Ew469bUr90SVpmFMwYbklFwM5PIYBBsclvQZ0cifBQYCxePbbh58bs4c";
const query1 = "forest";
const query2 = "sea";
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
/* console.log(btn1, btn2); */

const row = document.querySelector(".album .row");

const getImage = function (fullUrl) {
  fetch(fullUrl, {
    method: "get",
    headers: { Authorization: yourApiKey }
  })
    .then((response) => {
      /* console.log(response); */
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Spiacenti non siamo riusciti a reperire i dati. Errore: ${response.statusText}`
        );
      }
    })
    .then((images) => {
      console.log(images);
      console.log(images.photos);

      images.photos.forEach((img) => {
        /* console.log(img.photographer); */

        const col = document.createElement("div");
        col.className = "col-md-4";

        // Creazione dinamica del contenuto
        const card = document.createElement("div");
        card.className = "card mb-4 shadow-sm";

        const imgElement = document.createElement("img");
        imgElement.className = "bd-placeholder-img card-img-top";
        imgElement.src = img.src.medium;
        imgElement.alt = img.alt;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerText = img.photographer;

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerText = img.alt;

        const buttonGroup = document.createElement("div");
        buttonGroup.className = "btn-group";

        const viewButton = document.createElement("button");
        viewButton.className = "btn btn-sm btn-outline-secondary";
        viewButton.innerText = "View";
        viewButton.onclick = () => window.open(img.url, "_blank");

        const editButton = document.createElement("button");
        editButton.className = "btn btn-sm btn-outline-secondary";
        editButton.innerText = "Edit";

        const smallText = document.createElement("small");
        smallText.className = "text-muted";
        smallText.innerText = img.id;

        buttonGroup.appendChild(viewButton);
        buttonGroup.appendChild(editButton);

        const cardFooter = document.createElement("div");
        cardFooter.className =
          "d-flex justify-content-between align-items-center";
        cardFooter.appendChild(buttonGroup);
        cardFooter.appendChild(smallText);

        // Assemblaggio finale
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardFooter);
        card.appendChild(imgElement);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
      });
    })
    .catch((error) => {
      console.error("Errore nel recupero dei dati:", error);
      const row = document.querySelector(".row");
      row.innerHTML = `<div class="alert alert-danger" role="alert">
                     Non siamo riusciti a caricare le immagini. Riprova più tardi.
                   </div>`;
    });
};

btn1.onclick = () => {
  document.querySelector(".album .row").innerHTML = "";
  getImage(url + query1);
};
btn2.onclick = () => {
  document.querySelector(".album .row").innerHTML = "";
  getImage(url + query2);
};

/* window.addEventListener("DOMContentLoaded", function () {
  ;
});
 */
