let addArticle = JSON.parse(localStorage.getItem("Article"));

function initPage() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("orderId") !== null) {
    const elem = getById("orderId");
    elem.textContent = params.get("orderId");
    return false;
  }
  //récupére le local storage
  // fait un  boucle sur le le tableau
  // chaque tour de boucle, récupére l'id du prod et fait un requete à l'API
  // récupére le produit depuis le back fetch ('http://localhost:3000/api/products?id=' + mavarible),
  // modifie la couleur par la couleur du local storage
  // crée la quantité par le quantité du local storage
}

const panierDisplay = () => {
  //  permet d'inserer le contenu du local storage dans la page panier.

  if (addArticle !== null) {
    for (const product in addArticle) {
      const getArticle = creatEl("article");
      getArticle.className = "cart__item";
      getArticle.setAttribute(
        "data-color",
        addArticle[product].colorArticlePanier
      );
      getArticle.setAttribute("data-id", addArticle[product].id);

      const getBaliseImg = creatEl("div");
      getBaliseImg.className = "cart__item__img";

      const getImg = creatEl("img");
      getImg.src = addArticle[product].img;
      getImg.alt = addArticle[product].alt;

      const getItemContent = creatEl("div");
      getItemContent.className = "cart__item__content";

      const getItemContentDescription = creatEl("div");
      getItemContentDescription.className = "cart__item__content__description";

      const getColor = creatEl("p");
      getColor.textContent = addArticle[product].color;
      getColor.className = "color";

      const getPrix = creatEl("p");
      getPrix.textContent = addArticle[product].prix + " €";

      const getItemContentSettings = creatEl("div");
      getItemContentSettings.className = "cart__item__content__settings";

      const getItemContentQuantity = creatEl("div");
      getItemContentQuantity.className =
        "cart__item__content__settings__quantity";

      const getName = creatEl("h2");
      getName.textContent = addArticle[product].nom;
      getName.className = addArticle[product].id;
      getName.id = "id";

      const getPQty = creatEl("p");
      getPQty.textContent = "Qté : ";

      const getQty = creatEl("input");
      getQty.value = addArticle[product].qty;
      getQty.className = "itemQuantity";
      getQty.setAttribute("type", "number");
      getQty.setAttribute("min", "1");
      getQty.setAttribute("name", "itemQuantity");
      getQty.addEventListener("change", changeQty);

      const getBaliseDelete = creatEl("div");
      getBaliseDelete.className = "cart__item__content__settings__delete";

      const getDelete = creatEl("p");
      getDelete.className = "deleteItem";
      getDelete.textContent = "Supprimer";
      /* getDelete.addEventListener("click", deleteArticle);
      getDelete.myParamId = addArticle[product].id;
      getDelete.myColorId = addArticle[product].color;*/
      getDelete.addEventListener("click", (e) => {
        const elt = e.target;
        const parent = elt.closest("article");
        deleteArticle(parent);
      });

      getById("cart__items").appendChild(getArticle); // la methode appendChild  vous permet d'ajouter un nœud à la fin de la liste des nœuds enfants d'un nœud parent spécifié.
      getArticle.appendChild(getBaliseImg);
      getBaliseImg.appendChild(getImg);
      getArticle.appendChild(getItemContent);
      getItemContent.appendChild(getItemContentDescription);
      getItemContentDescription.appendChild(getName);
      getItemContentDescription.appendChild(getColor);
      getItemContentDescription.appendChild(getPrix);
      getItemContent.appendChild(getItemContentSettings);
      getItemContentSettings.appendChild(getItemContentQuantity);
      getItemContentQuantity.appendChild(getPQty);
      getItemContentQuantity.appendChild(getQty);
      getItemContentSettings.appendChild(getBaliseDelete);
      getBaliseDelete.appendChild(getDelete);
    }
  } else {
    const getArticle = creatEl("article");
    getArticle.className = "cart__item";
    const alertPanierVide = creatEl("p");
    alertPanierVide.style.fontSize = "25px";
    alertPanierVide.textContent = "Panier vide !";
    getById("cart__items").appendChild(getArticle);
    getArticle.appendChild(alertPanierVide);
  }
};

window.onload = function () {
  panierDisplay();
};

const prixNQty = () => {
  //  permet d'afficher le prix total ainsi que la quantité
  let panier = 0;
  let quantity = 0;
  if (addArticle !== null) {
    for (let x = 0; x < addArticle.length; x++) {
      let qty = addArticle[x].qty;
      let prix = addArticle[x].prix;
      quantity += qty;
      panier += qty * prix;
    }
  } else {
    panier = 0;
    getById("totalPrice").textContent = panier;
  }
  //console.log(panier);
  getById("totalPrice").textContent = panier;
  getById("totalQuantity").textContent = quantity;
};

prixNQty();

const changeQty = (e) => {
  console.log(e.target.value); //il faut qu'il change la qty total ainsi que dans le local storage ..... cree une nouvelle fonction pour changer la qty du produit sur le local storage et la qty total dans le DOM
};

const deleteArticle = (parent) => {
  console.log(parent); // utiliser la methode closet qui permet de savoir qui est lancetre
  //console.log(e.target.myColorId);
  // supprimer l'article du DOM ... mettre a jour la qty total du DOM .. mettre a jour aussi le prix total
  //sur le local storage supp le produit
};

// function qui permet de supprimer des articles

function getById(id) {
  return document.getElementById(id);
}

function creatEl(type) {
  return document.createElement(type);
}
// ................... //
// Formulaire
// regex
