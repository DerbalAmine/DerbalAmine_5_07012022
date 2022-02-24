const getProduct = () => {
  let id = new URLSearchParams(window.location.search).get("id"); // Permet de récupérer la valeur de l'ID

  fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then((product) => {
      console.table(product);
      for (const couleur of product.colors) {
        const colorsArticle = createElem("option"); // boucle qui permet de choisir les couleurs souhaiter
        colorsArticle.product = couleur;
        colorsArticle.textContent = couleur;
        getById("colors").appendChild(colorsArticle);
      }
      getById("addToCart").addEventListener("click", addToCart);
      getById("title").textContent = product.name;
      getById("price").textContent = product.price;
      getById("description").textContent = product.description;
      getById("addToCart").setAttribute("data-id", product._id);
      const getImg = createElem("img"); // variable qui est egal a l'element "img"
      getImg.src = product.imageUrl;
      getImg.alt = product.altTxt;
      document.querySelector(".item__img").appendChild(getImg);
    });
};
//Fonction alerte choix après ajout au panier
const afterAdd = () => {
  if (confirm("Produit ajouté a votre panier.\nAller directement au panier?")) {
    window.location.href = "../html/cart.html";
  } else {
    window.location.href = "../html/index.html";
  }
};

// Fonction qui permet d'ajouter un produit
const addToCart = () => {
  let quantity = parseInt(getById("quantity").value); // parseInt permet d'ignorer les caracteres qui ne sont pas des chiffres
  let color = getById("colors").value;
  let id = getById("addToCart").getAttribute("data-id");
  console.log(id);
  let prod = {
    id: id,
    color: color /*getById("colors").value,*/,
    quantity: quantity /*getById("quantity").value,*/,
  };
  let cart = [];

  if (prod.color == "" || prod.quantity <= 0) {
    alert(" Vous avez pas sélectionner de couleur et de quantité");
    return;
  }
  //Vérifie si il y a déja le produit dans le panier avec une couleur similaire pour ne modifier que la quantité
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart")); //parse ???
    for (let i in cart) {
      if (cart[i].id == prod.id && cart[i].color == prod.color) {
        cart[i].quantity = parseInt(cart[i].quantity) + parseInt(prod.quantity); // La fonction parseInt() analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée.
        localStorage.setItem("cart", JSON.stringify(cart)); // la methode stringify convertit un objet en chaine de caractere 
        afterAdd();
        return;
      }
    }
  }
  if (prod.color != "" && prod.quantity > 0) {
    cart.push(prod);
    localStorage.setItem("cart", JSON.stringify(cart));
    afterAdd();
  }
};

/* TOOLS */
function createElem(type) {
  return document.createElement(type);
}

function getById(id) {
  return document.getElementById(id);
}
window.onload = function () {
  // console.log("slt");
  getProduct();
};
