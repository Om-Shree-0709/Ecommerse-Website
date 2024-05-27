function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsElement = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("total-amount");

  cartItemsElement.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <div class="quantity-controls">
          <button class="decrease-btn" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="increase-btn" data-index="${index}">+</button>
        </div>
      </td>
      <td>$${itemTotal.toFixed(2)}</td>
    `;
    cartItemsElement.appendChild(row);
  });

  cartTotalElement.textContent = total.toFixed(2);
}

function updateItemQuantity(index, change) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index]) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}

// Event listener for increase and decrease buttons
document
  .getElementById("cart-items")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("increase-btn")) {
      const index = event.target.getAttribute("data-index");
      updateItemQuantity(index, 1);
    } else if (event.target.classList.contains("decrease-btn")) {
      const index = event.target.getAttribute("data-index");
      updateItemQuantity(index, -1);
    }
  });

document.addEventListener("DOMContentLoaded", loadCart);
