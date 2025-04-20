document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      const keyword = searchInput.value.trim().toLowerCase();

      // 검색 키워드와 상세페이지 매칭
      const productMap = {
        "track jacket": "detail.html",
        "two-way jacket": "detail2.html",
        "knitwear": "detail3.html",
        "long sleeve": "detail4.html",
        "sunshine bermuda pants": "detail5.html",
        "pocket pants": "detail6.html",
        "bermuda sweat pants": "detail7.html",
        "shorts pants": "detail8.html"
      };

      // 해당 키워드가 존재하는 경우 상세페이지로 이동
      if (productMap[keyword]) {
        window.location.href = productMap[keyword];
      } else {
        alert("해당 상품을 찾을 수 없습니다.");
      }
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const totalPriceElement = document.getElementById('total-price');
  
    // 장바구니 불러오기
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    if (cart.length === 0) {
      productList.innerHTML = '<p>장바구니가 비어 있습니다.</p>';
    } else {
      let total = 0;
  
      cart.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');
        productDiv.innerHTML = `
          <a href="${product.link}">
            <img src="${product.image}" alt="${product.name}">
          </a>
          <div class="item-info">
            <p class="item-name">${product.name}</p>
            <p class="item-price">${product.price.toLocaleString()}원</p>
  
            <label>사이즈:
              <select class="size-select">
                <option value="S" ${product.size === 'S' ? 'selected' : ''}>S</option>
                <option value="M" ${product.size === 'M' ? 'selected' : ''}>M</option>
                <option value="L" ${product.size === 'L' ? 'selected' : ''}>L</option>
                <option value="XL" ${product.size === 'XL' ? 'selected' : ''}>XL</option>
              </select>
            </label>
  
            <label>수량:
              <input type="number" value="${product.quantity}" min="1" class="quantity-input">
            </label>
  
            <button class="remove">삭제</button>
          </div>
        `;
        productList.appendChild(productDiv);
        total += product.price * product.quantity;
      });
  
      // 총 금액 표시
      totalPriceElement.textContent = total.toLocaleString();
    }
  
    // 수량 변경 이벤트
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        const quantity = parseInt(e.target.value);
        const itemName = e.target.closest('.cart-item').querySelector('.item-name').textContent;
  
        const product = cart.find(p => p.name === itemName);
        if (product) {
          product.quantity = quantity;
          localStorage.setItem('cart', JSON.stringify(cart));
          location.reload(); // 총 금액 반영
        }
      });
    });
  
    // 사이즈 변경 이벤트
    document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.forEach((product, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="150">
      <div class="item-info">
        <p class="item-name">${product.name}</p>
        <label for="size-${index}">사이즈:</label>
        <select class="item-size" data-index="${index}">
          <option value="S" ${product.size === "S" ? "selected" : ""}>S</option>
          <option value="M" ${product.size === "M" ? "selected" : ""}>M</option>
          <option value="L" ${product.size === "L" ? "selected" : ""}>L</option>
        </select>
        <p class="item-price">${product.price.toLocaleString()}원</p>
        <p>수량: ${product.quantity}</p>
      </div>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  // 사이즈 변경 시 로컬스토리지도 업데이트
  document.querySelectorAll('.item-size').forEach(select => {
    select.addEventListener('change', (e) => {
      const index = e.target.getAttribute('data-index');
      cart[index].size = e.target.value;
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  });
});

  
    // 삭제 버튼 이벤트
    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const itemName = e.target.closest('.cart-item').querySelector('.item-name').textContent;
        const updatedCart = cart.filter(p => p.name !== itemName);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        location.reload();
      });
    });
  });
 // cart.js

document.addEventListener("DOMContentLoaded", function () {
  const checkoutBtn = document.querySelector(".checkout");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      // buy.html로 이동
      window.location.href = "buy.html";
    });
  }
});
  