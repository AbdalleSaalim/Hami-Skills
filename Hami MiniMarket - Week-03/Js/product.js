
import { addToCart, updateCartUI } from "./cart.js";

const products = [
  { id: 0, name: "Tufaax", category: "fruit", price: 2, unit: "kg", image: "assets/tufaax.jpg" },
  { id: 1, name: "Cambe", category: "fruit", price: 1, unit: "kg", image: "assets/cambe.jpg" },
  { id: 2, name: "Babaay", category: "fruit", price: 3, unit: "kg", image: "assets/babaay.jpg" },
  { id: 3, name: "Qare", category: "fruit", price: 2, unit: "kg", image: "assets/Qare.jpg" },
  { id: 4, name: "Moos", category: "fruit", price: 4, unit: "kg", image: "assets/Moos.jpg" },
  { id: 5, name: "Liin", category: "fruit", price: 2, unit: "kg", image: "assets/liin.jpg" },
  { id: 6, name: "Baradho", category: "vegetable", price: 2, unit: "kg", image: "assets/Baradho.jpg" },
  { id: 7, name: "Yanyo", category: "vegetable", price: 3, unit: "kg", image: "assets/Yanyo.jpg" },
  { id: 8, name: "Basal", category: "vegetable", price: 5, unit: "kg", image: "assets/Basal.jpg" },
  { id: 9, name: "Karoto", category: "vegetable", price: 3, unit: "kg", image: "assets/Karoto.jpg" }
];

const productList = document.getElementById("product-list");
const cartButton = document.getElementById("cartButton");
const cartSidebar = document.getElementById("cartSidebar");

// search & category elements (from index.html)
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");

function displayProducts(list) {
  productList.innerHTML = "";
  if (!list || list.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }
  list.forEach((p) => {
    productList.innerHTML += `
      <div class="card">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='assets/default.jpg'">
        <h3>${p.name}</h3>
        <p><b>$${p.price} / ${p.unit}</b></p>
        <p>Category: ${p.category}</p>
        <input type="number" id="qty-${p.id}" class="quantity" min="1" value="1">
        <button onclick="addItem(${p.id})">Add to Cart</button>
      </div>`;
  });
}

window.addItem = function (id) {
  const qtyEl = document.getElementById(`qty-${id}`);
  const qty = parseInt(qtyEl?.value || "1", 10);
  if (isNaN(qty) || qty < 1) {
    alert("Please enter a valid quantity.");
    return;
  }
  addToCart(products.find(p => p.id === id), qty);
  updateCartUI();
};

// filtering function
function filterProducts() {
  const term = (searchInput?.value || "").trim().toLowerCase();
  const cat = (categorySelect?.value || "all");

  const filtered = products.filter(p => {
    const matchesCategory = cat === "all" || p.category === cat;
    const matchesSearch = term === "" ||
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.price.toString().includes(term);
    return matchesCategory && matchesSearch;
  });

  displayProducts(filtered);
}

// events
if (searchInput) searchInput.addEventListener("input", filterProducts);
if (categorySelect) categorySelect.addEventListener("change", filterProducts);

cartButton.addEventListener("click", () => {
  cartSidebar.classList.toggle("active");
});

// initial render
displayProducts(products);
updateCartUI();
