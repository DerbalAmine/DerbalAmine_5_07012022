const product = window.location.href;
const url = new URL(product);
const id = url.searchParams.get("id");
//const product = "";

console.log(id);
// je Récupére des articles de l'API
const getProduct = async () => {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => {
      return res.json();
    })
    // Répartition des données de l'API
    .then(function (resultatAPI) {
      const product = resultatAPI;
      console.table(product);
      selectColors(product);
      create(product);
     // Panier(product);
    });
};
//fonction qui permet d'afficher les infos .... produits description
function create(product) {
  const getImg = document.createElement("img");
  getImg.src = product.imageUrl;
  getImg.alt = product.altTxt;
  document.querySelector(".item__img").appendChild(getImg);

  const getTitle = document.getElementById("title"); // variable qui est egal a l'id "title"
  getTitle.textContent = product.name;

  const getPrice = document.getElementById("price");
  getPrice.textContent = product.price;

  const descriptionArticle = document.getElementById("description");
  descriptionArticle.textContent = product.description;
}

// Fonction qui permet d'inserer des options de couleur
function selectColors(product) {
  for (const couleur of product.colors) {
    const colorsArticle = document.createElement("option");
    colorsArticle.value = couleur;
    colorsArticle.textContent = couleur;
    document.getElementById("colors").appendChild(colorsArticle);
  }
}

/*function Panier(product) {
  const achat = document.getElementById("addToCart");
  achat.addEventListener("click", function () {
    if (document.getElementById("quantity").value > 0) {
      let quantityProduit = parseInt(document.getElementById("quantity").value); //parseInt analyse une chaine en nombre 
      let couleurProduit = document.getElementById("colors").value;
    }
  });
}*/

getProduct();
