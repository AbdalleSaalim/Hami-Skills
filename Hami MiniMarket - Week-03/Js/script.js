
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
const search = document.getElementById("search");
const category = document.getElementById("category");
const priceFilter = document.getElementById("priceFilter");
const cartCount = document.getElementById("cartCount");

let cart = 0;

function displayProducts(filteredProducts) {
  productList.innerHTML = "";
  filteredProducts.forEach((p) => {
    productList.innerHTML += `
      <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p><b>$${p.price} / ${p.unit}</b></p>
        <p>Category: ${p.category}</p>
        <input type="number" id="qty-${p.id}" class="quantity" min="1" value="1">
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>`;
  });
}

function addToCart(productId) {
  const qtyInput = document.getElementById(`qty-${productId}`);
  const quantity = parseInt(qtyInput.value);

  if (quantity < 1 || isNaN(quantity)) {
    alert("Please select a valid quantity.");
    return;
  }

  const product = products.find(p => p.id === productId);
  cart += quantity;
  cartCount.textContent = cart;
  alert(`${quantity} x ${product.name} added to cart!`);
}

function filterProducts() {
  const rawSearch = search.value.trim().toLowerCase();
  const categoryValue = category.value;
  const maxPrice = priceFilter.value ? parseFloat(priceFilter.value) : Infinity;

  // try to interpret search as a number (price) if possible
  const searchAsNumber = rawSearch !== "" && !isNaN(parseFloat(rawSearch)) ? parseFloat(rawSearch) : null;

  const filtered = products.filter(p => {
    // match name or category text
    const nameMatch = p.name.toLowerCase().includes(rawSearch);
    const categoryMatch = p.category.toLowerCase().includes(rawSearch);

    // match price: if user typed a number, treat as "price <= number"
    const priceMatch = searchAsNumber !== null
      ? p.price <= searchAsNumber
      : p.price.toString().includes(rawSearch);

    // overall search match (if search box empty, allow all)
    const searchMatch = rawSearch === "" || nameMatch || categoryMatch || priceMatch;

    // also apply the separate category select and numeric priceFilter controls
    const categoryPass = (categoryValue === "all" || p.category === categoryValue);
    const pricePass = p.price <= maxPrice;

    return searchMatch && categoryPass && pricePass;
  });

  displayProducts(filtered);
}

search.addEventListener("input", filterProducts);
category.addEventListener("change", filterProducts);
priceFilter.addEventListener("input", filterProducts);

displayProducts(products);