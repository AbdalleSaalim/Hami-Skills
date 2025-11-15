import { addToCart, updateCartUI } from "./cart.js";

const productList = document.getElementById("product-list");
const search = document.getElementById("search");
const category = document.getElementById("category");

const cartSidebar = document.getElementById("cartSidebar");
document.getElementById("cartButton").onclick = () =>
  cartSidebar.classList.toggle("active");

let products = [];

async function loadProducts() {
  const res = await fetch("data/products.json");
  products = await res.json();
  displayProducts(products);
}

function displayProducts(items) {
  productList.innerHTML = "";

  items.forEach((p, i) => {
    productList.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>

        <input type="number" id="qty-${i}" value="1" min="1" class="quantity">
        <button onclick="addItem(${i})">Add to Cart</button>
      </div>
    `;
  });
}

window.addItem = function (i) {
  let qty = parseInt(document.getElementById(`qty-${i}`).value);
  addToCart(products[i], qty);
};

function filter() {
  let term = search.value.toLowerCase();
  let cat = category.value;

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(term) &&
    (cat === "all" || p.category === cat)
  );

  displayProducts(filtered);
}

search.addEventListener("input", filter);
category.addEventListener("change", filter);

loadProducts();
updateCartUI();
