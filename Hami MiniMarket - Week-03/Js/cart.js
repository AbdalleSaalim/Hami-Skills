import { saveCart, loadCart } from "./storage.js";

let cart = loadCart();

/* ===========================
   ADD TO CART
=========================== */
export function addToCart(product, qty) {
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }

  saveCart(cart);
  updateCartUI();
}

/* ===========================
   UPDATE CART UI
=========================== */
export function updateCartUI() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  if (!cartItems) return;

  cartItems.innerHTML = "";
  let subtotal = 0;
  let count = 0;

  cart.forEach((item, index) => {
    let total = item.price * item.qty;
    subtotal += total;
    count += item.qty;

    cartItems.innerHTML += `
      <li>
        ${item.name} (${item.qty}) - $${total.toFixed(2)}
        <button onclick="removeItem(${index})">❌</button>
      </li>
    `;
  });

  // Discount & Tax
  let discount = subtotal > 50 ? subtotal * 0.10 : 0;
  let tax = (subtotal - discount) * 0.05;
  let final = subtotal - discount + tax;

  cartTotal.innerHTML = `Total: $${final.toFixed(2)}`;
  cartCount.textContent = count;

  saveCart(cart);
}

/* ===========================
   REMOVE ITEM
=========================== */
window.removeItem = function (i) {
  cart.splice(i, 1);
  saveCart(cart);
  updateCartUI();
};

/* ===========================
   SIDEBAR OPEN/CLOSE
=========================== */
const cartSidebar = document.getElementById("cartSidebar");
const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");

// Open sidebar
cartButton.addEventListener("click", () => {
  cartSidebar.classList.add("open");
});

// Close sidebar
closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
});

// Close sidebar when clicking outside
document.addEventListener("click", (e) => {
  if (!cartSidebar.contains(e.target) && !cartButton.contains(e.target)) {
    cartSidebar.classList.remove("open");
  }
});

