let shoppingCards = [];
let totalAmount = 0;
let shoppingCartCount = 0;
if (localStorage.getItem("shoppingCards")) {
  shoppingCards = JSON.parse(localStorage.getItem("shoppingCards"));
  shoppingCartCount = JSON.parse(localStorage.getItem("shoppingCartCount"));

  //Total fiyatı hesaplama
  for(let card of shoppingCards) {
    totalAmount += +card.price; 
  }
}

setShoppingCardToHTML();
setShoppingCardCountUsingLocalStorage();

//Güncelleme metodu(fonksiyonu)
function setShoppingCardToHTML() {
  const shoppingCardsElement = document.getElementById("shoppingCardsRow");
  shoppingCardsElement.innerHTML = "";

  for(const index in shoppingCards){
        const shoppingCard = shoppingCards[index];
        const text = `
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-8 col-12 mt-1">
        <div class="card">
          <div class="card-body product-image-div">
            <img src="${shoppingCard.image}" alt="" style="width: 100%; max-height:100%">
          </div>
          <div class="card-header product-name-div">
            <h6>${shoppingCard.name.substring(0,84)}</h6>
          </div>
          <div class="card-body text-center">
            <h4 class="alert alert-success">
            ${formatCurrencies(shoppingCard.price)}
            </h4>
            <button onclick="deleteByIndex(${index},${shoppingCard.id})" class="btn btn-outline-danger w-100">
              <i class="bi bi-trash"></i>
              Delete
            </button>
          </div>
        </div>
        </div>`

        if(shoppingCardsElement !== null){
            shoppingCardsElement.innerHTML += text;
        }
    }

    const totalAmountElement = document.getElementById('total_amount');
    totalAmountElement.innerHTML = formatCurrencies(totalAmount);
}

//SİLİNEBİLİR
// function setShoppingCardCountUsingLocalStorage() {
//   const shoppingCardCountElement = document.getElementById("shopping-card-count");
//   shoppingCardCountElement.innerHTML = shoppingCartCount;
// }

function setShoppingCardCountUsingLocalStorage() {
  let cards = [];
  if (localStorage.getItem("shoppingCards")) {
    cards = JSON.parse(localStorage.getItem("shoppingCards"));
  }

  const shoppingCardCountElement = document.getElementById("shopping-card-count");
  shoppingCardCountElement.innerHTML = cards.length;
}

const deleteByIndex = (index, id) => {
  Swal.fire({
    title: 'Delete!',
    text: 'Do you want to delete',
    icon: 'question',
    confirmButtonButtonText: 'Delete',
    showConfirmButton: true,
    showCancelButton: true,
    cancelButtonText: 'Cancel'
  }).then((response) => {
    if(response.isConfirmed) {
      shoppingCards.splice(index, 1);
      localStorage.setItem("shoppingCards", JSON.stringify(shoppingCards));

      const products = JSON.parse(localStorage.getItem("products"));
      const product = products.find(p => p.id === id)
      product.stock += 1;

      //products listesini güncelliyor işlemler bittikten sonra
      localStorage.setItem("products", JSON.stringify(products));

      // Sepet sayısını azalt
      shoppingCartCount--;
      localStorage.setItem("shoppingCartCount", shoppingCartCount);

      setShoppingCardToHTML();
      setShoppingCardCountUsingLocalStorage();
    }
  });
};

function payAndCreateOrder(event) {
  //Form elementi için
  event.preventDefault();
  const currenctTarget = event.currentTarget;
  Swal.fire({
    title: 'Pay?',
    text: 'Do you want to but this products',
    icon: 'question',
    confirmButtonText: 'Buy',
    showConfirmButton: true,
    showCancelButton: true,
    cancelButtonText: 'Cancel'
  }).then(result => {
    if(result.isConfirmed) {
      const creditCard = {};
      for(const el of currenctTarget) {
        if(el.name) {
          creditCard[el.name] = el.value;
        }
      }
      const data = {
        creditCard: creditCard,
        totalAmount: totalAmount,
        products: shoppingCards
      }
    
      // Sepetteki ürünleri temizleme
      shoppingCards = [];
      localStorage.removeItem("shoppingCards");
      setShoppingCardToHTML();
      setShoppingCardCountUsingLocalStorage();
    
      localStorage.setItem("orders", JSON.stringify(data));

      for(let el of currenctTarget) {
        if(el.name) {
          el.value= "";
          totalAmount = 0;
        }
      }
      setShoppingCardToHTML();
    }
  });
  
}