document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('cart')) { localStorage.setItem('cart', JSON.stringify([]));}
    const products = [
      {
        name: 'Компютер',
        image: 'imgs/prod1.jpg',
        price: 1099.00,
        category: 'PC'
      },
      {
        name: 'Ноутбук',
        image: 'imgs/prod2.jpg',
        price: 1299.00,
        category: 'laptop'
      },
      {
        name: 'iPhone',
        image: 'imgs/prod3.jpg',
        price: 1599.00,
        category: 'phone'
      },
    ];
  
    const productList = document.getElementById('product-list');
    let filteredProducts = [...products];
    let sortedProducts = [...products];
  
    function renderProducts(products) {
      productList.innerHTML = '';
      products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>$${product.price.toFixed(2)}</p>
          <button onclick="addToCart('${product.name}', '${product.image}', ${product.price})">Додати до корзини</button>
        `;
        productList.appendChild(productElement);
      });
    }
  
    window.sortProducts = function(order) {
      sortedProducts.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
      renderProducts(sortedProducts);
    };
  
    window.filterProducts = function() {
      const category = document.getElementById('category-filter').value;
      filteredProducts = category === 'all' ? [...products] : products.filter(product => product.category === category);
      sortedProducts = [...filteredProducts];
      renderProducts(sortedProducts);
    };
  
    renderProducts(sortedProducts);
  });
  
  function addToCart(name, image, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(product => product.name === name);
  
    if (productIndex > -1) {
      cart[productIndex].quantity += 1;
    } else {
      cart.push({ name, image, price, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} has been added to your cart at $${price.toFixed(2)}`);
  }
  