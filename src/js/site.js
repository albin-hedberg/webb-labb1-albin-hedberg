const productsJsonText = `
{
  "products": [
    {
      "type": "Pizza",
      "name": "Margerita",
      "details": "Tomat, Ost",
      "price": 90,
      "quantity": 1,
      "imgUrl": "../img/pizzas/Margerita.webp"
    },
    {
      "type": "Pizza",
      "name": "Funghi",
      "details": "Tomat, Ost, Champinjoner",
      "price": 90,
      "quantity": 1,
      "imgUrl": "../img/pizzas/Funghi.webp"
    },
    {
      "type": "Pizza",
      "name": "Vesuvio",
      "details": "Tomat, Ost, Skinka",
      "price": 90,
      "quantity": 1,
      "imgUrl": "../img/pizzas/Vesuvio.webp"
    },
    {
      "type": "Pizza",
      "name": "Capricciosa",
      "details": "Tomat, Ost, Skinka, Champinjoner",
      "price": 95,
      "quantity": 1,
      "imgUrl": "../img/pizzas/Capricciosa.webp"
    },
    {
      "type": "Pizza",
      "name": "Hawaii",
      "details": "Tomat, Ost, Skinka, Ananas",
      "price": 95,
      "quantity": 1,
      "imgUrl": "../img/pizzas/Hawaii.webp"
    },
    {
      "type": "Pizza",
      "name": "Africana",
      "details": "Tomat, Ost, Skinka, Ananas, Banan, Curry, Nötter",
      "price": 100,
      "quantity": 1,
      "imgUrl": "../img/pizzas/Africana.webp"
    },
    {
      "type": "Pizza",
      "name": "Salami",
      "details": "Tomat, Ost, Champinjoner, Salami, Mozzarella",
      "price": 100,
      "quantity": 1,
      "imgUrl": "../img/pizzas/Salami.webp"
    },
    {
      "type": "Pizza",
      "name": "Quattro Stagioni",
      "details": "Tomat, Ost, Skinka, Champinjoner, Räkor, Musslor, Kronärtskocka",
      "price": 100,
      "quantity": 1,
      "imgUrl": "../img/pizzas/Quattro Stagioni.webp"
    },
    {
      "type": "Pizza",
      "name": "Quattro Formaggi",
      "details": "Tomat, Ost, Gorgonzola, Mozzarella, Tallegio, Parmesan",
      "price": 105,
      "quantity": 1,
      "imgUrl": "../img/pizzas/Quattro Formaggi.webp"
    },
    {
      "type": "Pizza",
      "name": "Kebabpizza",
      "details": "Tomat, Ost, Kebabkött, Isbergssallad, Tomater, Lök, Peperoni",
      "price": 110,
      "quantity": 1,
      "imgUrl": "../img/pizzas/Kebabpizza.webp"
    },
    {
      "type": "Pizza",
      "name": "Barcelona",
      "details": "Tomat, Ost, Kebabkött, Pommes Frites",
      "price": 115,
      "quantity": 1,
      "imgUrl": "../img/pizzas/Barcelona.webp"
    },
    

    {
      "type": "Inbakad",
      "name": "Calzone",
      "details": "Tomat, Ost, Skinka",
      "price": 100,
      "quantity": 1,
      "imgUrl": "../img/pizzas/Calzone.webp"
    },
    {
      "type": "Inbakad",
      "name": "Italia",
      "details": "Tomat, Ost, Skinka, Champinjoner, Räkor, Vitlök",
      "price": 115,
      "quantity": 1,
      "imgUrl": "../img/pizzas/Italia.webp"
    },
    {
      "type": "Inbakad",
      "name": "Ciao Ciao",
      "details": "Tomat, Ost, Oxfilé, Champinjoner, Lök, Vitlök",
      "price": 115,
      "quantity": 1,
      "imgUrl": "../img/pizzas/Ciao Ciao.webp"
    },
    {
      "type": "Inbakad",
      "name": "Montana",
      "details": "Tomat, Ost, Skinka, Köttfärs, Lök, Vitlök, Gorgonzola",
      "price": 115,
      "quantity": 1,
      "imgUrl": "../img/pizzas/Montana.webp"
    },


    {
      "type": "Dricka",
      "name": "Cola",
      "details": "33 cl, Socker",
      "price": 25,
      "quantity": 1,
      "imgUrl": "../img/drinks/Cola.webp"
    },
    {
      "type": "Dricka",
      "name": "Fanta",
      "details": "33 cl, Socker",
      "price": 25,
      "quantity": 1,
      "imgUrl": "../img/drinks/Fanta.webp"
    },
    {
      "type": "Dricka",
      "name": "Sprite",
      "details": "33 cl, Socker",
      "price": 25,
      "quantity": 1,
      "imgUrl": "../img/drinks/Sprite.webp"
    }
  ]
}`;

class Product {
  constructor(type, name, details, price, quantity, imgUrl) {
    this.type = type;
    this.name = name;
    this.details = details;
    this.price = price;
    this.quantity = quantity;
    this.imgUrl = imgUrl;
  }
}

const products = [];
const cartProducts = [];

const pizzaProducts = document.querySelector("#pizza-products");
const inbakadeProducts = document.querySelector("#inbakad-products");
const drinkProducts = document.querySelector("#drink-products");

const cartBadge = document.querySelector("#cart-badge");
const cartTable = document.querySelector("#cart-table");
const cartTotalPrice = document.querySelector("#cart-total-price");
const cartBuyBtn = document.querySelector("#cart-buy-btn");

const detailsTitle = document.querySelector("#details-title");
const detailsInfo = document.querySelector("#details-info");

let productsInCart = 0;
let totalPrice = 0;

function getProducts() {
  const localJSON = JSON.parse(productsJsonText);
  const productsProp = localJSON["products"];

  for (const product of productsProp) {
    const p = new Product(
      product.type,
      product.name,
      product.details,
      product.price,
      product.quantity,
      product.imgUrl
    );
    products.push(p);
  }

  displayProducts();
}

async function displayProducts() {
  pizzaProducts.innerHTML = "";
  inbakadeProducts.innerHTML = "";
  drinkProducts.innerHTML = "";

  for (const product of products) {
    const col = document.createElement("div");
    const card = document.createElement("div");
    const cardImg = document.createElement("img");
    const cardImgUrl = product.imgUrl;
    const cardBody = document.createElement("div");
    const cardTitle = document.createElement("h2");
    const addBtn = document.createElement("button");
    const detailsBtn = document.createElement("button");

    applyProductStyles(
      col,
      card,
      cardImg,
      cardImgUrl,
      cardBody,
      cardTitle,
      addBtn,
      detailsBtn
    );

    cardTitle.innerText = product.name;

    addBtn.innerText = "Lägg till";
    addBtn.onclick = () => {
      addBtnClick(product);
    };

    detailsBtn.setAttribute("data-bs-toggle", "modal");
    detailsBtn.setAttribute("data-bs-target", "#details-modal");
    detailsBtn.innerText = "Detaljer";
    detailsBtn.onclick = () => {
      detailBtnClick(product);
    };

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(addBtn);
    cardBody.appendChild(detailsBtn);

    card.appendChild(cardImg);
    card.appendChild(cardBody);

    col.appendChild(card);

    switch (product.type) {
      case "Pizza":
        pizzaProducts.appendChild(col);
        break;
      case "Inbakad":
        inbakadeProducts.appendChild(col);
        break;
      case "Dricka":
        drinkProducts.appendChild(col);
        break;

      default:
        break;
    }

    await sleep(50);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function applyProductStyles(
  col,
  card,
  cardImg,
  cardImgUrl,
  cardBody,
  cardTitle,
  addBtn,
  detailsBtn
) {
  col.classList.add("col");
  card.classList.add("card", "fade-in");
  cardImg.classList.add("card-img-top");
  cardImg.src = cardImgUrl;
  cardImg.alt = "Product image";
  cardImg.loading = "lazy";
  cardBody.classList.add("card-body");
  cardTitle.classList.add("card-title");
  addBtn.classList.add("btn", "btn-success", "me-2");
  detailsBtn.classList.add("btn", "btn-outline-primary");
}

function populateCartProducts() {
  cartTable.innerHTML = "";

  for (const product of cartProducts) {
    displayCartProducts(product);
  }
}

function displayCartProducts(product) {
  const tr = document.createElement("tr");
  const nameTd = document.createElement("td");
  const priceTd = document.createElement("td");
  const quantityTd = document.createElement("td");
  const removeBtnTd = document.createElement("td");
  const removeBtn = document.createElement("button");

  nameTd.innerText = product.name;
  priceTd.innerText = product.price + ":-";
  quantityTd.innerText = product.quantity;

  removeBtn.innerText = "-";
  removeBtn.classList.add("btn", "btn-danger");

  removeBtn.onclick = () => {
    removeBtnClick(product);
  };

  removeBtnTd.appendChild(removeBtn);
  tr.appendChild(nameTd);
  tr.appendChild(priceTd);
  tr.appendChild(quantityTd);
  tr.appendChild(removeBtnTd);
  cartTable.appendChild(tr);
}

function addBtnClick(product) {
  if (cartProducts.includes(product)) {
    const i = cartProducts.findIndex((p) => p === product);
    cartProducts[i].quantity++;
  } else {
    cartProducts.push(product);
  }

  productsInCart++;
  cartBadge.innerText = productsInCart;

  totalPrice += parseFloat(product.price);
  cartTotalPrice.innerText = `Totalt: ${totalPrice}:-`;

  populateCartProducts();
}

function removeBtnClick(product) {
  const i = cartProducts.findIndex((p) => p === product);

  if (cartProducts[i].quantity > 1) {
    cartProducts[i].quantity--;
  } else {
    cartProducts.splice(i, 1);
  }

  productsInCart--;
  cartBadge.innerText = productsInCart;

  totalPrice -= parseFloat(product.price);
  cartTotalPrice.innerText = `Totalt: ${totalPrice}:-`;

  populateCartProducts();
}

function detailBtnClick(product) {
  detailsTitle.innerText = product.name;
  detailsInfo.innerHTML = `<p>Typ: ${product.type}</p><p>Info: ${product.details}</p><p>Pris: ${product.price}:-</p>`;
}

cartBuyBtn.addEventListener("click", function () {
  cartProducts.length = 0;
  cartTable.innerHTML = "";

  productsInCart = 0;
  cartBadge.innerText = productsInCart;

  totalPrice = 0;
  cartTotalPrice.innerText = `Totalt: ${totalPrice}:-`;
});

getProducts();
