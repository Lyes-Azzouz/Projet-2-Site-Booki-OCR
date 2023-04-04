// Déclaration de la variable modale
let modal = null;

// Fonction pour ouvrir la modale
const openModal = function (e) {
    e.preventDefault();
    // Récupération de la modale ciblée
    const target = document.querySelector(e.target.getAttribute("href"));
    // Affichage de la modale
    target.style.display = null;
    // Suppression de l'attribut aria-hidden
    target.removeAttribute("aria-hidden");
    // Ajout de l'attribut aria-modal
    target.setAttribute("aria-modal", "true");
    // Affectation de la variable modale
    modal = target;
    // Ajout de l'écouteur d'événement click pour fermer la modale
    modal.addEventListener("click", closeModal);
    // Ajout de l'écouteur d'événement click pour fermer la modale
    modal.querySelector(".js-close-modal").addEventListener("click", closeModal);
    // Ajout de l'écouteur d'événement click pour empêcher la propagation du clic sur la modale
    modal
        .querySelector(".js-stop-modal")
        .addEventListener("click", stopPropagation);
};

// Fonction pour fermer la modale
const closeModal = function (e) {
    // Vérification de l'affichage de la modale
    if (modal === null) return;
    e.preventDefault();
    // Masquage de la modale
    modal.style.display = "none";
    // Ajout de l'attribut aria-hidden
    modal.setAttribute("aria-hidden", "true");
    // Suppression de l'attribut aria-modal
    modal.removeAttribute("aria-modal");
    // Remise a zéro de la variable modale
    modal = null;
    // Suppression de l'écouteur d'événement click pour fermer la modale
    modal.removeEventListener("click", closeModal);
    // Suppression de l'écouteur d'événement click pour fermer la modale
    modal
        .querySelector(".js-close-modal")
        .removeEventListener("click", closeModal);
    // Suppression de l'écouteur d'événement click pour empêcher la propagation du clic sur la modale
    modal
        .querySelector(".js-stop-modal")
        .removeEventListener("click", stopPropagation);
};

// Fonction pour empêcher la propagation du clic sur la modale
const stopPropagation = function (e) {
    e.stopPropagation();
};

// Suppression de la galerie
const deleteGallery = document.querySelector("#btn-modal2");
deleteGallery.addEventListener("click", function () {
    const sectionGalleryModal = document.querySelector("#gallery-modal");
    sectionGalleryModal.innerHTML = "";

    const sectionGalleryPage = document.querySelector(".gallery");
    sectionGalleryPage.innerHTML = "";
});

// Ajout de l'écouteur d'événement click pour ouvrir la modale
document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
});

// Récupération des éléments HTML nécessaires
const modal1 = document.getElementById("modal1");
const title = modal1.querySelector("#title-modal");
const gallery = modal1.querySelector("#gallery-modal");
const modif = modal1.querySelector(".modif");

// Récupération du bouton "Ajouter une photo"
const btnModal1 = modal1.querySelector("#btn-modal1");

// Récupération du bouton "Supprimer la galerie"
const btnModal2 = modal1.querySelector("#btn-modal2");

// Ajout de l'écouteur d'événement click sur le bouton "Ajouter une photo" , pour que l'utilisateur puisse ajouter une photo depuis son pc
btnModal1.addEventListener("click", function () {
    // Modification du titre de la modal
    title.textContent = "Ajout photo";
    title.classList.add("title-modal-loadpicture");

    // Masquage de la galerie
    gallery.style.display = "none";

    // Masquage des boutons "Ajouter une photo" et "Supprimer la galerie"
    btnModal1.style.display = "none";
    btnModal2.style.display = "none";

    // Création des éléments HTML nécessaires pour l'ajout d'une photo
    const div = document.createElement("div");
    div.classList.add("div-modal-style");

    const imgI = document.createElement("span");
    imgI.classList.add("fa-sharp", "fa-regular", "fa-image");
    imgI.classList.add("imgI-style");

    const boutonAjout = document.createElement("button");
    boutonAjout.textContent = "+ Ajouter photo";

    // Création d'un input de type "file"
    const inputPhoto = document.createElement("input");
    inputPhoto.type = "file";

    // Ajout de l'écouteur d'événement change sur l'input "file"
    inputPhoto.addEventListener("change", function () {
        // Récupération du fichier sélectionné
        const fichier = inputPhoto.files[0];

        // Vérification que le fichier est une image
        if (fichier && fichier.type.startsWith("image/")) {
            // Création d'un élément img pour afficher l'image
            const image = new Image();
            image.src = URL.createObjectURL(fichier);
            image.alt = fichier.name;

            // Ajout des propriétés width et height pour ajuster la taille de l'image
            image.onload = function () {
                const ratio = image.naturalWidth / image.naturalHeight;
                if (ratio > 1) {
                    image.width = 129;
                    image.height = 129 / ratio;
                    image.style.paddingBottom = "10px"
                } else {
                    image.height = 193;
                    image.width = 193 * ratio;
                    image.style.paddingBottom = "10px"
                }
            };

            // Remplacement du logo "imgI" par l'image
            imgI.parentNode.replaceChild(image, imgI);
        } else {
            alert("Veuillez sélectionner une image.");
        }
    });



    // Clic sur l'input "file"
    boutonAjout.addEventListener("click", function () {
        inputPhoto.click();
    });

    // Création des éléments pour le formulaire d'envois de la modal
    const sousTitre = document.createElement("p");
    sousTitre.textContent = "jpg, png : 4mo max";

    // Ajout des élements titre et catégorie selon les consignes demandées
    const inputTitre = document.createElement("input");
    inputTitre.type = "text";

    const labelTitre = document.createElement("label");
    labelTitre.textContent = "Titre";

    const inputCategorie = document.createElement("input");
    inputCategorie.type = "number";

    const labelCategorie = document.createElement("label");
    labelCategorie.textContent = "Catégorie";

    const btnValider = document.createElement("button");
    btnValider.textContent = "Valider";

    // Ajout de la flèche retour avec la balise <i> de fontawesome
    const flecheRetour = document.createElement("i");
    flecheRetour.classList.add("fa-sharp", "fa-solid", "fa-arrow-left");
    flecheRetour.classList.add("fleche-modal-style");
    flecheRetour.style.cursor = "pointer";

    // Ajout des éléments HTML créés à la modal
    title.appendChild(flecheRetour);

    div.appendChild(imgI);
    div.appendChild(boutonAjout);
    div.appendChild(sousTitre);
    div.appendChild(inputTitre);
    div.appendChild(labelTitre);
    div.appendChild(labelCategorie);
    div.appendChild(inputCategorie);
    div.appendChild(btnValider);

    modif.appendChild(div);

    // Ajout des classes des éléments crées
    boutonAjout.id = "bouton-ajout";
    btnValider.id = "btn-valider-style";
    sousTitre.id = "sous-titre-btnmodal";
    inputTitre.id = "input-titre-style";
    inputCategorie.id = "input-categorie-style";
    labelTitre.id = "label-titre-style";
    labelCategorie.id = "label-categorie-style";

    console.log(boutonAjout);

    // Ajout de l'écouteur d'évènement au click sur le bouton 'Valider"
    btnValider.addEventListener("click", async () => {
        //Récupération des données du formulaire


        const inputPhotoForm = inputPhoto;
        const photoFormulaire = inputPhotoForm.files[0];
        const imageUrl = URL.createObjectURL(photoFormulaire);
        const titreFormulaire = inputTitre.value;
        const categorieFormulaire = inputCategorie.value;


        //Création de l'objet formData contenant les donnée du forumlaire
        const formData = new FormData();
        formData.append("image", imageUrl);
        formData.append("title", titreFormulaire);
        formData.append("category", categorieFormulaire);
        formData.append("userId", 1);

        const token = sessionStorage.getItem("token");
        console.log(token);

        const reponse = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MDU5MTgxMywiZXhwIjoxNjgwNjc4MjEzfQ.ZkF2SszKnE0cA3-G-mMbsJPliqzEFk3BTYy9ZgDoUUc",
                "accept": "application/json",
                "Content-Type": "multipart/form-data"

            },
            body: JSON.stringify(formData),
        });

        if (reponse.ok) {
            // Récupere les travaux mis a jour si c'est ok 
            const travaux = await fetch("http://localhost:5678/api/works");
            const works = await travaux.json();
            // Regénération de la gallery
            genererworks(works);
            genererworksmodal(works);
        }
    }
    );

    // Ajout de l'écouteur d'événement click sur la flèche retour
    flecheRetour.addEventListener("click", function () {
        // Affichage de la galerie
        gallery.style.display = "";

        // Affichage des boutons "Ajouter une photo" et "Supprimer la galerie"
        btnModal1.style.display = "";
        btnModal2.style.display = "";
        title.textContent = "Gallerie photo";

        // Suppression des éléments HTML créés pour l'ajout d'une photo
        modif.removeChild(div);
    });
});
