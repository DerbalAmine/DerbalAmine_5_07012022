let cart = JSON.parse(localStorage.getItem("cart"));

//Insère l'id de commande dans la page confirmation
const initPage = () => {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("order_id");
  const elem = getById("orderId");
  if (elem != null) {
    elem.textContent = orderId;
  }
};
initPage();

//Ajoute le html avec les valeurs retournées par fetch
const panierDisplay = (value) => {
  let getArticle = createElem("article");
  getArticle.setAttribute("class", "cart__item");
  getArticle.setAttribute("data-id", value._id);
  getArticle.setAttribute("data-color", cart[i].color);
  let target = querySelect("#cart__items");
  target.appendChild(getArticle); // la methode appendChild  vous permet d'ajouter un nœud à la fin de la liste des nœuds enfants d'un nœud parent spécifié.
  getArticle = createElem("div");
  getArticle.setAttribute("class", "cart__item__img");
  target = selectAll(".cart__item");
  target[target.length - 1].appendChild(getArticle);
  getArticle = createElem("img");
  getArticle.src = value.imageUrl;
  getArticle.alt = value.altTxt;
  target = selectAll(".cart__item__img");
  target[target.length - 1].appendChild(getArticle);
  getArticle = createElem("div");
  getArticle.className = "cart__item__content";
  target = selectAll(".cart__item");
  target[target.length - 1].appendChild(getArticle);
  getArticle = createElem("div");
  getArticle.className = "cart__item__content__description";
  target = selectAll(".cart__item__content");
  target[target.length - 1].appendChild(getArticle);
  getArticle = createElem("h2");
  getArticle.textContent = value.name;
  target = selectAll(".cart__item__content__description");
  target[target.length - 1].appendChild(getArticle);
  getArticle = createElem("p");
  getArticle.textContent = cart[i].color;
  target = selectAll(".cart__item__content__description");
  target[target.length - 1].appendChild(getArticle);
  getArticle = createElem("p");
  getArticle.textContent = `${value.price} €`;
  target = selectAll(".cart__item__content__description");
  target[target.length - 1].appendChild(getArticle);
  getArticle = createElem("div");
  getArticle.className = "cart__item__content__settings";
  target = selectAll(".cart__item__content");
  target[target.length - 1].appendChild(getArticle);
  getArticle = createElem("div");
  getArticle.className = "cart__item__content__settings__quantity";
  target = selectAll(".cart__item__content__settings");
  target[target.length - 1].appendChild(getArticle);
  getArticle = createElem("p");
  getArticle.textContent = "Qté : ";
  target = selectAll(".cart__item__content__settings__quantity");
  target[target.length - 1].appendChild(getArticle);
  getArticle = createElem("input");
  getArticle.setAttribute("type", "number");
  getArticle.className = "itemQuantity";
  getArticle.setAttribute("name", "itemQuantity");
  getArticle.setAttribute("min", 1);
  getArticle.setAttribute("max", 100);
  getArticle.setAttribute("value", cart[i].quantity);
  target = selectAll(".cart__item__content__settings__quantity");
  target[target.length - 1].appendChild(getArticle);
  getArticle = createElem("div");
  getArticle.className = "cart__item__content__settings__delete";
  target = selectAll(".cart__item__content__settings");
  target[target.length - 1].appendChild(getArticle);
  getArticle = createElem("p");
  getArticle.className = "deleteItem";
  getArticle.textContent = "Supprimer";
  target = selectAll(".cart__item__content__settings__delete");
  target[target.length - 1].appendChild(getArticle);
};

//boucle qui calcule le prix total des produits dans le panier
const totalPrice = () => {
  let cartProducts = selectAll(".cart__item");
  let totalPrice = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    let price = selectAll(".cart__item__content__description")[i].lastChild
      .textContent;
    let qty = selectAll(".itemQuantity")[i].value;
    totalPrice += parseInt(price) * parseInt(qty); //parseInt analyse une chaine de caractere fournie en argument et renvoie un element exprimer dans la base de donnee
  }
  querySelect("#totalPrice").textContent = totalPrice;
};

//boucle qui calcule la quantité totale des produits dans le panier
const totalQuantity = () => {
  let totalQty = 0;
  let nbr = selectAll(".itemQuantity");
  for (let i = 0; i < nbr.length; i++) {
    let value = nbr[i].value;
    totalQty += parseInt(value);
  }
  querySelect("#totalQuantity").textContent = totalQty;
};

//Remplace les données stockées par celles de la page
const storeNewCart = (data) => {
  cart = [];
  for (let i = 0; i < data; i++) {
    let product = {
      id: "",
      color: "",
      quantity: "",
    };
    product.id = selectAll(".cart__item")[i].dataset.id; //dataset permet de lire les attribut data de l'html (data-color // data-id)
    product.color = selectAll(".cart__item")[i].dataset.color;
    product.quantity = selectAll(".itemQuantity")[i].value;
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

//Supprime un produit du panier et lance les fonctions de recalcul et de stockage
const deleteArticle = () => {
  let data = cart.length;
  for (let i = 0; i < data; i++) {
    selectAll(".deleteItem")[i].addEventListener("click", function () {
      let supp = selectAll(".deleteItem")[i].closest(".cart__item"); // utiliser la methode closet qui permet de savoir qui est lancetre
      supp.remove(); //remove permet de supprimer l'element d'une liste deroulante
      storeNewCart(cart.length - 1);
      totalQuantity();
      totalPrice();
    });
  }
};

//Reaction dynamique à la modification ou suppression des produits
const dynamicChange = () => {
  for (let i = 0; i < cart.length; i++) {
    selectAll(".itemQuantity")[i].addEventListener("input", function () {
      totalQuantity();
      totalPrice();
      storeNewCart(cart.length);
    });
  }
  deleteArticle();
};

//Affichage des produits du panier
async function display() {
  if (getById("cart__items") != null && cart != null) {
    for (i in cart) {
      let data = await fetch(
        `http://localhost:3000/api/products/${cart[i].id}`
      );
      if (!data.ok) {
        throw new Error(message);
      }
      let value = await data.json();
      panierDisplay(value);
    }
    totalQuantity();
    totalPrice();
    dynamicChange();
  }
}
display();

/* FORMULAIRE */
let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};
//Enregistre les données si les champs sont bien remplis
const confirmForm = () => {
  if (
    validFirstName == true &&
    validLastName == true &&
    validAddress == true &&
    validCity == true &&
    validEmail == true
  ) {
    contact.firstName = getById("firstName").value;
    contact.lastName = getById("lastName").value;
    contact.address = getById("address").value;
    contact.city = getById("city").value;
    contact.email = getById("email").value;
  }
};

//Liste les id des produits dans le panier
const confirmProducts = () => {
  products = [];
  for (i in cart) {
    products.push(cart[i].id);
  }
};

let products = [];

//Gère la validité des données entrées dans le formulaire
const formulaire = () => {
  const regexName = /^[^±!@£$%^&*_+¡€#¢§¶•ªº()"«\\/\{\}\[\]\~<>?:;|=.,\d\s]+$/;
  if (getById("cart__items") != null) {
    getById("firstName").addEventListener("input", function (e) {
      if (regexName.test(e.target.value) && e.target.value != "") {
        getById("firstNameErrorMsg").textContent = "";
        validFirstName = true;
      } else {
        getById("firstNameErrorMsg").textContent =
          "Veuillez saisir un prénom valide";
        return false;
      }
    });
    getById("lastName").addEventListener("input", function (e) {
      const regexName =
        /^[^±!@£$%^&*_+¡€#¢§¶•ªº()"«\\/\{\}\[\]\~<>?:;|=.,\d\s]+$/;
      if (regexName.test(e.target.value) && e.target.value != "") {
        getById("lastNameErrorMsg").textContent = "";
        validLastName = true;
      } else {
        getById("lastNameErrorMsg").textContent =
          "Veuillez entrer un nom valide";
        return false;
      }
    });
    getById("address").addEventListener("input", function (e) {
      const regexAddress =
        /^[^±!@£$%^&*_+¡€#¢§¶•ªº()"«\\/\{\}\[\]\~<>?:;|=.]+$/;
      if (regexAddress.test(e.target.value) && e.target.value != "") {
        getById("addressErrorMsg").textContent = "";
        validAddress = true;
      } else {
        getById("addressErrorMsg").textContent =
          "Veuillez entrer une addresse valide";
        return false;
      }
    });
    getById("city").addEventListener("input", function (e) {
      const regexCity = /^[^±!@£$%^&*_+¡€#¢§¶•ªº()"«\\/\{\}\[\]\~<>?:;|=.\d]+$/;
      if (regexCity.test(e.target.value) && e.target.value != "") {
        getById("cityErrorMsg").textContent = "";
        validCity = true;
      } else {
        getById("cityErrorMsg").textContent =
          "Veuillez entrer une ville valide";
        return false;
      }
    });
    getById("email").addEventListener("input", function (e) {
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]+$/;
      if (regexEmail.test(e.target.value) && e.target.value != "") {
        getById("emailErrorMsg").textContent = "";
        validEmail = true;
      } else {
        getById("emailErrorMsg").textContent =
          "Veuillez entrer une addresse email valide";
        return false;
      }
    });
  }
};
formulaire();

//Envoie les détails de la commande à l'Api
const confirmed = () => {
  if (contact.firstName != "" && products.length > 0) {
    let order = {
      contact,
      products,
    };
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (value) {
        localStorage.removeItem("cart");
        window.location.href = `../html/confirmation.html?order_id=${value.orderId}`;
      })
      .catch(function (err) {
        console.log(err);
      });
  }
};

//Ecoute le clique du bouton commander et lance les autres fonctions
const click = () => {
  if (getById("cart__items") != null) {
    const confirm = getById("order");
    confirm.addEventListener("click", function (e) {
      e.preventDefault(); //si la saisis est incorrect empeche le rechargement de la page
      confirmForm();
      confirmProducts();
      confirmed();
    });
  }
};
click();

/* TOOLS */

function getById(id) {
  return document.getElementById(id);
}

function selectAll(type) {
  return document.querySelectorAll(type);
}

function createElem(type) {
  return document.createElement(type);
}
function querySelect(type) {
  return document.querySelector(type);
}
