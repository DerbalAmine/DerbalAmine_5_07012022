let id = new URLSearchParams(window.location.search).get("id"); // Permet de récupérer la valeur de l'ID

fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    console.table(value);
    for (const couleur of value.colors) {
      const colorsArticle = createElem("option"); // boucle qui permet ce choisir les couleurs souhaiter
      colorsArticle.value = couleur;
      colorsArticle.textContent = couleur;
      getById("colors").appendChild(colorsArticle);
    }
    getById("addToCart").addEventListener("click", addToCart);
    getById("title").textContent = value.name;
    getById("price").textContent = value.price;
    getById("description").textContent = value.description;
    const getImg = createElem("img"); // variable qui est egal a l'element "img"
    getImg.src = value.imageUrl;
    getImg.alt = value.altTxt;
    document.querySelector(".item__img").appendChild(getImg);
  });
/* .catch(function (err) {
    console.log(err);
  });
*/
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
    cart = JSON.parse(localStorage.getItem("cart"));
    for (i in cart) {
      if (cart[i].id == prod.id && cart[i].color == prod.color) {
        cart[i].quantity = parseInt(cart[i].quantity) + parseInt(prod.quantity);
        localStorage.setItem("cart", JSON.stringify(cart)); // la methode stringify convertit une valeur js en chaine JSON
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
