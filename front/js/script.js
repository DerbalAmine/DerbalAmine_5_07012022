const fetchKanap = async () => {
  const reponse = await fetch("http://localhost:3000/api/products");
  console.log(reponse);
  return reponse.json(); // methode qui s'auto-resout en renvoiyant le body de la requete
};

const userDisplay = async () => {
  const kanap = await fetchKanap();
  console.log(kanap);
  kanap.map((prod) => {
    create(prod);
  });
};

function create(prod) {
  let link = createElem("a");
  link.setAttribute("href", "./product.html?id=" + prod._id);

  let article = createElem("article");

  let img = createElem("img");
  img.setAttribute("src", prod.imageUrl);
  img.setAttribute("alt", prod.altTxt);

  let h3 = createElem("h3");
  h3.setAttribute("class", "productName");
  h3.textContent = prod.name;

  let para = createElem("p");
  para.setAttribute("class", "productDescription");
  para.textContent = prod.description;

  article.append(img, h3, para);

  link.append(article);

  getById("items").append(link);
}
/* TOOLS */
function createElem(type) {
  return document.createElement(type);
}

function getById(id) {
  return document.getElementById(id);
}

window.onload = function () {
  // console.log("slt");
  userDisplay();
};

