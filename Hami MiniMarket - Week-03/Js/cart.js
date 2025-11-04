import { saveCart, loadCart } from "./storage.js";

let cart = loadCart();
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

export function addToCart(product, qty) {
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }
  updateCartUI();
  saveCart(cart);
}

export function updateCartUI() {
  if (!cartItems) return;
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    count += item.qty;

    cartItems.innerHTML += `
      <li>
        ${item.name} (${item.qty}) - $${subtotal}
        <button onclick="removeItem(${index})">❌</button>
      </li>`;
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  cartCount.textContent = count;
  saveCart(cart);
}

window.removeItem = function (index) {
  cart.splice(index, 1);
  updateCartUI();
  saveCart(cart);
};
