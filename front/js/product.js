let id = new URLSearchParams(window.location.search).get("id"); // Permet de récupérer la valeur de l'ID

// je Récupére un article de l'API
const getProduct = () => {
  //const id = new URLSearchParams(window.location.search).get("id");
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => {
      return res.json();
    })
    // Répartition des données de l'API
    .then(function (product) {
      console.table(product);
      create(product);
      stockCart(product);
    });
};
//fonction qui permet d'afficher les infos .... produits description
const create = (product) => {
  for (const couleur of product.colors) {
    const colorsArticle = createElem("option");
    colorsArticle.value = couleur;
    colorsArticle.textContent = couleur;
    getById("colors").appendChild(colorsArticle);
  }
  const getImg = createElem("img");
  getImg.src = product.imageUrl;
  getImg.alt = product.altTxt;
  document.querySelector(".item__img").appendChild(getImg);

  const getTitle = getById("title"); // variable qui est egal a l'id "title"
  getTitle.textContent = product.name;

  const getPrice = getById("price");
  getPrice.textContent = product.price;

  const descriptionArticle = getById("description");
  descriptionArticle.textContent = product.description;
};
// Fonction qui permet d'ajouter un produit
const stockCart = (product) => {
  getById("addToCart").addEventListener("click", () => {
    if (getById("quantity").value > 0) {
      let qty = parseInt(getById("quantity").value);
      let color = getById("colors").value;

      let Prod = {
        img: product.imageUrl,
        qty: qty,
        color: color,
        id: id,
        prix: product.price,
        nom: product.name,
        alt: product.altTxt,
      };
      let cart = JSON.parse(localStorage.getItem("Article"));
      console.table(cart);

      if (cart == null) {
        cart = [];
        cart.push(Prod);
        localStorage.setItem("Article", JSON.stringify(cart));
        alert("Produit ajouté au panier avec succès");
      } else {
        const searchStorage = cart.find(
          (strg) => strg.id === id && strg.color === color // la methode find renvoie la valeur du premier element trouver
        );
        if (searchStorage) {
          let nvQuantity = Prod.qty + searchStorage.qty;
          searchStorage.qty = nvQuantity;
          localStorage.setItem("Article", JSON.stringify(cart)); // la methode stringify convertit une valeur js en chaine JSON
          window.alert("Produit ajouté au panier");
        } else {
          cart.push(Prod);
          localStorage.setItem("Article", JSON.stringify(cart));
        }
      }
    } else {
      alert("Veuillez choisir une Quantité");
    }
  });
};
/* TOOLS */
function createElem(type) {
  return document.createElement(type);
}

function getById(id) {
  return document.getElementById(id);
}

window.onload = function () {
  // console.log("DOM is loaded");
  getProduct();
};
