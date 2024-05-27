document.addEventListener("DOMContentLoaded", function () {
  var currentPage = window.location.pathname;
  var navLinks = document.querySelectorAll("#navbar li a");

  navLinks.forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// Array to hold cart items
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add item to cart
function addToCart(name, price, unit) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, unit, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();

  // Display a message when item is added to cart
  const popup = document.createElement("div");
  popup.textContent = `${name} added to cart`;
  popup.classList.add("popup");
  document.body.appendChild(popup);

  // Automatically remove the popup after 3 seconds
  setTimeout(() => {
    popup.remove();
  }, 3000);
}

// Function to update the cart display
function updateCart() {
  const cartElement = document.querySelector("#cart");
  if (!cartElement) return;
  cartElement.innerHTML = "";
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.textContent = `${item.name} - $${item.price}/${item.unit} x ${item.quantity}`;
    cartElement.appendChild(cartItem);
  });
}

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    const unit = button.getAttribute("data-unit");
    addToCart(name, price, unit);
  });
});

// Initialize cart display on page load
window.onload = () => {
  const cartElement = document.querySelector("#cart");
  if (cartElement) {
    updateCart();
  }
};
