const productSearch = window.location.href;
const url = new URL(productSearch);
const id = url.searchParams.get("id");
const product = "";

console.log(id);
// Récupération des articles de l'API
const getProduct = async () => {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => {
      return res.json();
    })
    // Répartition des données de l'API dans le DOM
    .then(function (resultatAPI) {
      const product = resultatAPI;
      console.table(product);
      selectColors(product);
      create(product);
    });
};

function create(product) {
  const getImg = document.createElement("img");
  getImg.src = product.imageUrl;
  getImg.alt = product.altTxt;

  const getTitle = document.getElementById("title");
  getTitle.textContent = product.name;

  const getPrice = document.getElementById("price");
  getPrice.textContent = product.price;

  const descriptionArticle = document.getElementById("description");
  descriptionArticle.textContent = product.description;

  document.querySelector(".item__img").appendChild(getImg);
}

function selectColors(product) {
  // Fonction permettant d'inserer les options de couleur
  for (let couleur of product.colors) {
    const couleurArticle = document.createElement("option");
    couleurArticle.value = couleur;
    couleurArticle.innerHTML = couleur;
    document.getElementById("colors").appendChild(couleurArticle);
  }
}
getProduct();
