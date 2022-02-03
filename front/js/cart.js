let addArticle = JSON.parse(localStorage.getItem("Article"));

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
      getItemContentQuantity.className = "cart__item__content__settings__quantity";

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

      const getBaliseDelete = creatEl("div");
      getBaliseDelete.className = "cart__item__content__settings__delete";

      const getDelete = creatEl("p");
      getDelete.className = "deleteItem";
      getDelete.textContent = "Supprimer";

      getById("cart__items").appendChild(getArticle);
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
    alertPanierVide.textContent = "Votre panier est vide !";
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

// permet de supprimer 1 articles

function getById(id) {
  return document.getElementById(id);
}

function creatEl(type) {
  return document.createElement(type);
}
