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
  const addToCartBtn = document.querySelector('.add-to-cart');

  addToCartBtn.addEventListener('click', () => {
    const productName = document.querySelector('.product-title').textContent;
    const productPrice = parseInt(document.querySelector('.price').textContent.replace(/[^\d]/g, ''));
    const productImage = document.querySelector('.main-image img').getAttribute('src');
    const selectedSize = document.getElementById('size').value;
    const currentPage = location.pathname.split("/").pop(); // 예: detail2.html

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 중복 상품 체크 (이름 + 사이즈로 판단)
    const existingProduct = cart.find(p => p.name === productName && p.size === selectedSize);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        image: productImage,
        size: selectedSize,
        quantity: 1,
        link: currentPage // 현재 페이지 링크 저장
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // 장바구니 페이지로 이동
    window.location.href = 'cart.html';
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
  const sizeSelects = document.querySelectorAll('.size-select');
  sizeSelects.forEach(select => {
    select.addEventListener('change', (e) => {
      const newSize = e.target.value;
      const itemName = e.target.closest('.cart-item').querySelector('.item-name').textContent;

      const product = cart.find(p => p.name === itemName);
      if (product) {
        product.size = newSize;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
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
document.addEventListener('DOMContentLoaded', () => {
  // 썸네일 이미지와 메인 이미지
  const thumbnails = document.querySelectorAll('.thumbnails img');
  const mainImage = document.getElementById('mainImage');

  // 썸네일 클릭 시 메인 이미지 변경
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (e) => {
      // 클릭한 썸네일의 이미지를 메인 이미지로 설정
      mainImage.src = e.target.src;
      mainImage.alt = e.target.alt; // alt 텍스트도 변경
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // 탭 버튼과 탭 내용
  const tabButtons = document.querySelectorAll('.tab-buttons li');
  const tabContents = document.querySelectorAll('.tab-content');

  // 탭 버튼 클릭 시 탭 내용 변경
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // 모든 탭 버튼에서 active 클래스 제거
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // 클릭한 탭 버튼에 active 클래스 추가
      button.classList.add('active');

      // 모든 탭 내용에서 active 클래스 제거
      tabContents.forEach(content => content.classList.remove('active'));
      
      // 해당 탭에 해당하는 내용에 active 클래스 추가
      const activeTabContent = document.getElementById(targetTab);
      if (activeTabContent) {
        activeTabContent.classList.add('active');
      }
    });
  });

  // 페이지 로드 시 첫 번째 탭 기본 활성화
  tabButtons[0].classList.add('active');
  tabContents[0].classList.add('active');
});

