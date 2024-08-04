let products = [];
let shoppingCards = [];
let shoppingCartCount = 0;

// Sayfa yüklendiğinde localStorage'dan sayacı al
if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
}

if (localStorage.getItem("shoppingCards")) {
    shoppingCards = JSON.parse(localStorage.getItem("shoppingCards"));
    shoppingCartCount = JSON.parse(localStorage.getItem("shoppingCartCount"));
}

//Fonksiyonu çağırmadığımız sürece çalışmaz!
setProductToHTML();
setShoppingCardCount();

function setProductToHTML() {
    // 'İnnerHTML += ......' her defasında eski elemaları ve yeni elemanı getirir bunu önlemek için for dan önce innerHTML'in içerisini boşaltıyoruz.
    const productsRowElement = document.getElementById("productsRow")
    productsRowElement.innerHTML = "";
    // Her eklenecek ürün için ekleme işlemini for ile yaptırıyoruz.
    for(const index in products) {
        const add = products[index];

        let buttonText = `<button class="btn btn-danger w-100" disabled>
                <i class="bi bi-exclamation-diamond-fill"></i>
                No product in stock
            </button>`;

        if(add.stock > 0) {
            buttonText = `<button onclick="addShoppingCard(${index})" class="btn btn-outline-dark w-100">
                <i class="bi bi-cart-plus"></i>
                Add Shoping Cart
            </button>`
        }

        // HTML deki ürün bölümünü JS kısmına çektim.
        const product = `<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mt-1">
                        <div class="card">
                            <div class="card-body product-image-div">
                                <img src="${add.image}" alt="picture" >
                            </div>
                            <div class="card-header product-name-div" style= "flex-direction: column">
                                <h6>
                                    ${add.name.substring(0, 59)}
                                </h6>
                                <span>Stock: ${add.stock}</span>
                            </div>
                            <div class="card-bod text-center">
                                <h6 class="alert alert-danger">
                                    ${formatCurrencies(add.price)}
                                </h6>
                                ${buttonText}
                            </div>
                        </div>
                    </div>`

        // Ürünü eklemek istediğim yere id vererek yine aynı id üzerinden sayfanın o bölümüne ekleme işlemi gerçekleştirdim.
        
        if (productsRowElement !== null) {
            productsRowElement.innerHTML += product;
        }
    }
}

function save(event) {
    //Forma tıklandığında sayfanın yenilenmemesini sağlıyor. Bunu event ile yapıyoruz.
    event.preventDefault();
    const nameElement = document.getElementById("name")
    const priceElement = document.getElementById("price")
    const imageElement = document.getElementById("image")
    const stockElement = document.getElementById("stock")

    const id = products.length + 1 ;

    // Elementlerin değerlerini alıyoruz
    const newProduct = {
        id: id,
        name: nameElement.value,
        price: priceElement.value,
        image: imageElement.value,
        stock: stockElement.value
    }

    // Diziye ekleme işlemi gerçekleştiriliyor.
    products.push(newProduct);

    //Local storage a eleman ekleme
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("shoppingCards", JSON.stringify(shoppingCards));
    localStorage.setItem("shoppingCartCount", shoppingCartCount);

    nameElement.value = "";
    priceElement.value = "";
    imageElement.value = "";
    stockElement.value = 0; 

    // Button tetiklendikten sonra modal formunu kapatmak için bu kodu kullanıyoruz.
    const closeBtnElement = document.getElementById("addProductModalCloseBtn");
    closeBtnElement.click();

    //Listeye eklenen elemanın sayafada görülebilmes için
    setProductToHTML();

    //Toastr Mesajı için düzenlemeler...
    const toastrOptions = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-bottom-right"
    }
    toastr.options = toastrOptions;
    toastr.success("Product add is successful");
    //Warning | info | danger | success 
    
}

// Sepete ürün ekleme
function addShoppingCard(index) {
    const product = products[index]
    shoppingCards.push(product);
    //Sepete ürün eklendikçe stok sayısını azaltma
    product.stock -= 1;
  
    // Sayacı artır ve localStorage'a kaydet
    shoppingCartCount++;
    localStorage.setItem("shoppingCartCount", shoppingCartCount);
    localStorage.setItem("shoppingCards", JSON.stringify(shoppingCards));
    localStorage.setItem("products", JSON.stringify(products));
    //Listeyi güncelledikten sonra ürünlerin stok adedinin güncellenmiş halini tekrardan gösteriyoruz setProductToHTML ile.
    setProductToHTML();
    // Sepetteki ürün sayısını da güncelle
    setShoppingCardCount();
  }

function setShoppingCardCount() {
    const shoppingCardCountElement = document.getElementById("shopping-card-count");
    shoppingCardCountElement.innerHTML = shoppingCartCount;
}


//  function setShoppingCardCountUsingLocalStorage() {
//      let cards = [];
//      if(localStorage.getItem("shoppingCards")) {
//          cards = JSON.parse(localStorage.getItem("shoppingCards"));
//      }
//      const shoppingCardCountElement = document.getElementById("shopping-card-count");
//      shoppingCardCountElement.innerHTML = cards.length;
//  }