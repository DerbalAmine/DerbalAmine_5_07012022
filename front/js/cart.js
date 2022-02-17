window.onload = function () {
  // appele la fonction InitPage
  initPage();
};

//Insère l'id de commande dans la page confirmation
const initPage = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("order_id") != null) {
    const elem = getById("orderId");
    elem.textContent = params.get("order_id");
  } else {
    display();
  }
};

//Affichage des produits du panier
const display = async () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart != null && cart != "") {
    for (let i in cart) {
      let data = await fetch(
        `http://localhost:3000/api/products/${cart[i].id}`
      );
      if (!data.ok) {
        throw new Error(message);
      }
      let value = await data.json();
      panierDisplay(value, cart[i]);
    }
    totalQuantity();
    totalPrice();
    dynamicChange();
    submitOrder();
  }
};

//Ajoute le html avec les valeurs retournées par fetch
const panierDisplay = (value, cart) => {
  let getArticle = createElem("article");
  getArticle.setAttribute("class", "cart__item");
  getArticle.setAttribute("data-id", value._id);
  getArticle.setAttribute("data-color", cart.color);
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
  getArticle.textContent = cart.color;
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
  getArticle.setAttribute("value", cart.quantity);
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
  let cart = JSON.parse(localStorage.getItem("cart"));
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
  let cart = JSON.parse(localStorage.getItem("cart"));
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
  let cart = JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < cart.length; i++) {
    selectAll(".itemQuantity")[i].addEventListener("input", function () {
      totalQuantity();
      totalPrice();
      storeNewCart(cart.length);
    });
  }
  deleteArticle();
};

/* FORMULAIRE */
const getElem = (e) => {
  e.preventDefault();
  let contact = {};
  const selectForm = document.forms[0];

  const firstName = selectForm.elements.firstName.value;
  if (checkData("firstName", firstName)) {
    return false;
  }
  contact.firstName = firstName;

  const lastName = selectForm.elements.lastName.value;
  if (checkData("lastName", lastName)) {
    return false;
  }
  contact.lastName = lastName;

  const address = selectForm.elements.address.value;
  if (checkData("address", address)) {
    return false;
  }
  contact.address = address;

  const city = selectForm.elements.city.value;
  if (checkData("city", city)) {
    return false;
  }
  contact.city = city;

  const email = selectForm.elements.email.value;
  if (checkData("email", email)) {
    return false;
  }
  contact.email = email;
  confirmProducts(contact);
};

//Liste les id des produits dans le panier
const confirmProducts = (contact) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  products = [];
  for (i in cart) {
    products.push(cart[i].id);
  }
  console.log(contact);
  console.log(products);
  requetePost(contact, products);
};

//Envoie les détails de la commande à l'Api
const requetePost = (contact, products) => {
  // Donnees a envoyer
  let order = {
    contact,
    products,
  };
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json" },
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      localStorage.removeItem("cart");
      window.location.href = `../html/confirmation.html?order_id=${value.orderId}`;
    });
};

// Bind event on input type Submit (event.preventDefault in getElem to stop propagation)
const submitOrder = () => {
  const button = getById("order");
  button.addEventListener("click", getElem);

  const selectForm = document.forms[0];
  selectForm.elements.firstName.addEventListener("keyup", checkContent);
  selectForm.elements.lastName.addEventListener("keyup", checkContent);
  selectForm.elements.address.addEventListener("keyup", checkContent);
  selectForm.elements.city.addEventListener("keyup", checkContent);
  selectForm.elements.email.addEventListener("keyup", checkContent);
};

const checkContent = (e) => {
  if (checkData(e.target.id, e.target.value)) {
    return false;
  } else {
    let msg = getById(e.target.id + "ErrorMsg");
    msg.textContent = "";
  }
};

/**
 *  validate form
 */
const checkData = (type, val) => {
  let ret = false;
  switch (type) {
    case "firstName":
    case "lastName":
    case "city":
      ret = checkNoNumber(type, val);
      break;
    case "address":
      ret = checkaddress(type, val);
      break;
    case "email":
      ret = checkemail(type, val);
      break;
  }

  return ret;
};

/**
 *  Test avec arg type = firstname || lastname || city, arg val string without number or special characters
 */
const checkNoNumber = (type, val) => {
  //Regex
  const checkNumber = /[0-9]/;
  const checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;
  if (
    checkNumber.test(val) === true ||
    checkSpecialCharacter.test(val) === true ||
    val === ""
  ) {
    let msg = getById(type + "ErrorMsg");
    msg.textContent = "You must fill the field with only letters";
    return true;
  }
  return false;
};

/**
 *  Test avec arg type = address, arg val string without special characters
 */
const checkaddress = (type, val) => {
  //regex
  const checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;
  if (checkSpecialCharacter.test(val) === true || val == "") {
    let msg = getById(type + "ErrorMsg");
    msg.textContent = "You must fill the field with only letters and numbers";
    return true;
  }
  return false;
};

/**
 *  Test avec arg type = email, arg val string /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
 */
const checkemail = (type, val) => {
  //emailregex.com
  const checkMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (checkMail.test(val) === false) {
    let msg = getById(type + "ErrorMsg");
    msg.textContent = "You must fill the field with a valid email";
    return true;
  }
  return false;
};

/* TOOLS */

const getById = (id) => {
  return document.getElementById(id);
};

const selectAll = (type) => {
  return document.querySelectorAll(type);
};

const createElem = (type) => {
  return document.createElement(type);
};

const querySelect = (type) => {
  return document.querySelector(type);
};
