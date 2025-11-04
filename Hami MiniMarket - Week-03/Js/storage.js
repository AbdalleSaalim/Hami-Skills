export function saveCart(cart) {
  localStorage.setItem("cartData", JSON.stringify(cart));
}

export function loadCart() {
  return JSON.parse(localStorage.getItem("cartData")) || [];
}
