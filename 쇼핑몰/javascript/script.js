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
  