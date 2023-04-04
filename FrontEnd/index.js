const reponse = await fetch("http://localhost:5678/api/works", {
    method: 'GET',
    headers: {
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MDE3OTI5MywiZXhwIjoxNjgwMjY1NjkzfQ.lJKOqeglPNzKxSQGO7mM-nXRKVkZOCKS8CIyr-duoVE',

    }

});


const works = await reponse.json();

// Fonction pour générer les articles du site avec les données du JSON
function genererworks(works) {
    // Boucle pour parcourir toutes les données du JSON
    for (let i = 0; i < works.length; i++) {
        const article = works[i];

        // Création d'un élément de type "figure"
        const figureElement = document.createElement("figure");

        // Création d'un élément de type "img" et ajout de l'URL de l'image du JSON
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;

        // Création d'un élément de type "figcaption" et ajout du titre de l'article du JSON
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = article.title;

        console.log(nomElement);

        // Récupération de l'élément "section" avec la classe "gallery"
        const sectionGallery = document.querySelector(".gallery");

        // Ajout de l'élément "figure" à l'élément "section" récupéré précédemment
        sectionGallery.appendChild(figureElement);

        // Ajout de l'élément "img" et de l'élément "figcaption" à l'élément "figure"
        figureElement.appendChild(imageElement);
        figureElement.appendChild(nomElement);
    }
}

// Fonction qui va selectionner la gallery et supprime l'enfant element de la gallery

function supprimerElement(index) {
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.removeChild(sectionGallery.childNodes[index]); // la méthode c'est removeChild qui se base sur l'index (en parametre [index]) des éléments générer (works) avec la propriété "childNodes" qui représente
    // les "noeuds" qui sont juste les éléments du DOM , noeuds = éléments dom , ici noeuds = works
}

// Fonction avec une boucle for pour la modal , fonctionne comme celle du haut "genereworks"

function genererworksmodal(works) {
    for (let i = 0; i < works.length; i++) {
        const article = works[i];

        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;

        const nomElement = document.createElement("figcaption");
        nomElement.innerText = "editer";

        const mouveArrow = document.createElement("a");
        mouveArrow.href = "#";
        mouveArrow.innerHTML =
            '<i class="fa-solid fa-arrows-up-down-left-right mouve"></i>';

        figureElement.appendChild(mouveArrow);

        const trashIcon = document.createElement("a");
        trashIcon.href = "#";
        trashIcon.innerHTML =
            '<i class="fa-sharp fa-regular fa-trash-can trash"></i>';

        // Ajout d'un évemenent clic pour l'icon trash , pour qu'au click l'élémment en question soit supprimé
        trashIcon.addEventListener("click", () => {
            fetch(`http://localhost:5678/api/works/${article.id}`, {
                method: "DELETE",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    const index = works.findIndex((work) => work.id === article.id); // Trouver l'index de l'article à supprimer
                    works.splice(index, 1);
                    figureElement.remove();
                    supprimerElement(index);
                })
                .catch((error) => console.error("Error:", error));
        });

        figureElement.appendChild(trashIcon);

        console.log(nomElement);

        const sectionGallery = document.querySelector("#gallery-modal");

        sectionGallery.appendChild(figureElement);

        figureElement.appendChild(imageElement);

        figureElement.appendChild(nomElement);
    }
}

genererworks(works);
genererworksmodal(works);

// Filterbar : relier les les éléments enfants à la filterbar

const filterBar = document.querySelector(".filterbar");

const boutonTous = document.querySelector(".tous");

const boutonObjets = document.querySelector(".objets");

const boutonAppart = document.querySelector(".appart");

const boutonHotel = document.querySelector(".hotel");

filterBar.appendChild(boutonTous);

filterBar.appendChild(boutonObjets);

filterBar.appendChild(boutonAppart);

filterBar.appendChild(boutonHotel);

// Ajoute l'écouteur d'événnement au click pour chaque bouton de la filterbar

boutonTous.addEventListener("click", function () {
    const worksTous = works.filter(function (work) {
        return work.categoryId;
    });
    console.log(worksTous);
    document.querySelector(".gallery").innerHTML = "";
    genererworks(worksTous);
});

// C'est la meme façon de procéder pour chaque bouton , on crée un évenement au clic du bouton
// Ceci permet de filtrer les élements en fonction de leur id de catégorie
boutonObjets.addEventListener("click", function () {
    const worksObjets = works.filter(function (work) {
        return work.categoryId === 1;
    });
    console.log(worksObjets);
    document.querySelector(".gallery").innerHTML = "";
    genererworks(worksObjets);
});

boutonAppart.addEventListener("click", function () {
    const worksAppart = works.filter(function (work) {
        return work.categoryId === 2;
    });
    console.log(worksAppart);
    document.querySelector(".gallery").innerHTML = "";
    genererworks(worksAppart);
});

boutonHotel.addEventListener("click", function () {
    const worksHotel = works.filter(function (work) {
        return work.categoryId === 3;
    });
    console.log(worksHotel);
    document.querySelector(".gallery").innerHTML = "";
    genererworks(worksHotel);
});

// Supprimer ou afficher la filterbar si user est co ou non

const userIsCo = sessionStorage.getItem("token") !== null; // Vérifie si l'utilisateur est connecté

const filterbar = document.querySelector(".filterbar");
if (!userIsCo) {
    filterbar.style.display = "block"; // Affiche la filterbar
    filterBar.style.bottom = "25px";
} else if (userIsCo) {
    filterbar.style.display = "none"; // Supprime la filterbar
}

const loginBtn = document.querySelector(".logOut");
if (userIsCo) {
    loginBtn.innerText = "logout";
    loginBtn.style.textDecoration = "none";
    loginBtn.addEventListener("click", () => {
        sessionStorage.removeItem("token");
        loginBtn.href = "./index.html";
    });
} else {
    loginBtn.innerText = "login";
    loginBtn.style.textDecoration = "none";
}

const titrePage = document.getElementById("titre-page-top");
const modifierBtn = document.getElementById("btn-modifier");
const modifierBtn2 = document.getElementById("btn-modifier-2");
if (userIsCo) {
    modifierBtn.classList.remove("button-modifier-hide"); // Affiche le bouton modifier
    modifierBtn2.classList.remove("button-modifier-hide"); // Affiche le bouton modifier
    titrePage.classList.add("titre-top");
} else {
    modifierBtn.classList.add("button-modifier-hide"); // Cache le bouton modifier
    modifierBtn2.classList.add("button-modifier-hide"); // Cache le bouton modifier
    titrePage.classList.remove("titre-top");
}

const logoutLink = document.querySelector("#loginOut");
logoutLink.addEventListener("click", function () {
    sessionStorage.removeItem("token"); // Supprime le token de la session
    window.location.href = "../index.html"; // Redirige l'utilisateur vers la page index.html
});

// Création de la topBar située en haut de la page
if (userIsCo) {
    const headerPage = document.querySelector("header");

    const topBar = document.createElement("div");

    const boutonsTopBar = document.createElement("div");

    const boutonEditionI = document.createElement("span");
    boutonEditionI.classList.add(
        "boutonEI",
        "fa-sharp",
        "fa-regular",
        "fa-pen-to-square"
    );

    const boutonEdition = document.createElement("span");
    boutonEdition.textContent = "Mode édition";

    const boutonChangement = document.createElement("span");
    boutonChangement.textContent = "publier les changements";

    boutonEdition.classList.add("bouton-edition");
    boutonChangement.classList.add("bouton-changement");

    headerPage.appendChild(topBar);
    headerPage.style.marginTop = "100px";
    topBar.classList.add("topbar-style");
    topBar.appendChild(boutonsTopBar);
    boutonsTopBar.appendChild(boutonEdition);
    boutonsTopBar.appendChild(boutonChangement);
    boutonEdition.appendChild(boutonEditionI);
}
