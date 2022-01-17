let kanap = [];

const fetchKanap = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((reponse) => reponse.json())
    .then((reponse2) => (kanap = reponse2));
  console.log(kanap[2]);
};

const userDisplay = async () => {
  await fetchKanap();
  document.getElementById("items").innerHTML = kanap
    .map(
      (kanap) => `<a href="./product.html?id=${kanap._id}">
    <article>
    <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
    <h3 class="productName">${kanap.name}</h3>
    <p class="productDescription">${kanap.description}</p>
    </article>
    </a>`
    )
    .join("");
};
userDisplay();
