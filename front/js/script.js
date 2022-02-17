// creation de la fonction fetchKanap en mode 'asynchrone' qui permet au code d'etre executer pendant qu’une opération plus longue ou demandant une réponse / valeur est en cours.
const fetchKanap = async () => {
  const reponse = await fetch("http://localhost:3000/api/products"); //Chemin de la ressource que nous souhaitons recuperer qui permet de retourner une 'promesse'.
  console.log(reponse);
  return reponse.json(); // promesse qui convertit le js en jSon. ... methode qui s'auto-resout en renvoiyant le body de la requete
};

const userDisplay = async () => {
  const kanap = await fetchKanap();
  console.log(kanap);
  kanap.map((prod) => {
    create(prod);
  });
};

// la fonction create(), affiche les donnees sous forme de html 
//utiliser le parametre 'prod' pour faire l'appel de la fonction 
const create = (prod) => {
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

