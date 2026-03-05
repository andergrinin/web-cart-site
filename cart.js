document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('cart')) { localStorage.setItem('cart', JSON.stringify([]));}
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
  
    function renderCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cartItemsContainer.innerHTML = '';
      let total = 0;
  
      cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
  
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <h2>${item.name}</h2>
            <p>Ціна: $${item.price.toFixed(2)}</p>
            <p>Кількість: <button  onclick="updateQuantity(${index}, -1)">-</button> ${item.quantity} <button onclick="updateQuantity(${index}, 1)">+</button></p>
            <p>Загалом $${itemTotal.toFixed(2)}</p>
          </div>
          <button  onclick="removeFromCart(${index})">Прибрати</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
      });
  
      cartTotalContainer.innerHTML = `Загальна сума: $${total.toFixed(2)}`;
    }
  
    window.updateQuantity = function(index, change) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    };
  
    window.removeFromCart = function(index) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    };
  
    window.clearCart = function() {
      localStorage.removeItem('cart');
      renderCart();
    };
  
    renderCart();
  });
  