let products = [];
const shoppingCards = [];
let image = "";

if(localStorage.getItem("products")){
    products = JSON.parse(localStorage.getItem("products")); //JSON.parse ile stringe dönüştürmemizin sebebi LocalStorage da işlemeler string ifade ile tanımlı olmak zorunda.
}

/*

Manuel Tanımlamanın yapıldığı yer.

const exampleProduct = {
    name: "Xiaomi Redmi RMMNT215NF 21.5 75Hz 6ms Full HD Monitör",
    price: 2479.99,
    image: "https://m.media-amazon.com/images/I/41IGuXBZUuL._AC_UF1000,1000_QL80_.jpg" 
}

products.push(exampleProduct);

const exampleProduct_Two = {
    name: "Iphone 15 Pro Max 512 GB",
    price: 67999.99,
    image: "https://m.media-amazon.com/images/I/81nHfLrIogL._AC_SL1500_.jpg" 
}

products.push(exampleProduct_Two);
*/

setProductToHTML();
setShoppingCardCountUsingLocalStoreAge();

function setProductToHTML() {
    /*Döngüden önceki kayıtları siler bu sayede artarak giden kayıt şeklinin önüne geçilmiş olunur */
    const productsRowElement = document.getElementById('productsRow');
    productsRowElement.innerHTML = "";

    for(const index in products){
        const product = products[index];

        /* Stok miktarını kontrol edip duruma göre sepete ekle butonunu çalıştırıyor. */
        let buttonText = `<button class="btn btn-danger w-100" disabled>
            <i class="bi bi-exclamation-diamond-fill"></i>
                No Product in Stock
            </button>`;

        if(product.stock > 0) {
            buttonText = `<button onclick="addShoppingCard(${index})" class="btn btn-dark w-100">
            <i class="bi bi-cart-plus"></i>
                Add Shopping Cart
            </button>`
        }

        const text = `
        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mt-2">
            <div class="card">
                <div class="card-body product-image-div">
                    <img src="${product.image}" alt="" style="width: 100%; max-height:100%">
                    </div>
                    <div class="card-header product-name-div" style="flex-direction: column">
                        <h5>${product.name.substring(0,30)}...</h5>
                        <span>Stock: ${product.stock}</span>
                    </div>
                    <div class="card-body">
                        <h4 class="alert alert-danger text-center w-100">
                            ${formatCurency(product.price)} <!-- Türk lirası formatında formatlayıp değeri veriyor -->
                        </h4>
                        ${buttonText} 
                    </div>
                </div>
            </div>`
    
    if(productsRowElement !== null) {
        productsRowElement.innerHTML += text; //İnnerHTML içerisindeki verileri siler yeniden yazar. Bu yüzden + işareti kullanıyoruz.
    }
    /*
    Yukarıdaki if bloğunu bir çok şekilde tanımlayabiliyoruz.
    Örneğin Ternary operatörü şeklinde;
    productsRowElement !== null ? productsRowElement?.innerHTML = text : ""
    
    Veya düz bir şekilde;
    productsRowElement?.innerHTML = text;
     */
    
    }
    
}

function getImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    
    reader.onload = function (event) {
        image = event.target.result;
    }

    reader.readAsDataURL(file);
}

function save(event) {
    event.preventDefault();
    const nameElement = document.getElementById('name');
    const priceElement = document.getElementById('price');
    const stockElement = document.getElementById('stock');
    const id = products.length + 1;

    const saveProduct = {
        id: id,
        name: nameElement.value,
        image: image,
        price: priceElement.value,
        stock: stockElement.value
    };


    /* LocalStorage de depolama sağlıyor. Her user'ın kendi bir localStorage'ı bulunuyor. */
    products.push(saveProduct);

    localStorage.setItem("products",JSON.stringify(products));

    nameElement.value = "";
    priceElement.value = "";
    stockElement.value = 0;

    /* Ekleme işleminden sonra modal'ı kapatıyor */
    const closeBtnElement = document.getElementById('addProductModalCloseBtn');
    closeBtnElement.click();

    setProductToHTML();

    const toastrOptions = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-bottom-right",
    }
    toastr.options = toastrOptions;
    toastr.success("Product add is successful");
    // Warning | info | danger | success

}

/* Sepete eklendiğinde sayacın artmasını sağlayan kısım */
function addShoppingCard(index) {
    const product = products[index];
    shoppingCards.push(product);

    product.stock -= 1;

    localStorage.setItem("shoppingCards", JSON.stringify(shoppingCards));
    localStorage.setItem("products", JSON.stringify(products));
    setProductToHTML();
    setShoppingCardCountUsingLocalStoreAge();
}

function setShoppingCardCountUsingLocalStoreAge() {
    let cards = [];
    if (localStorage.getItem("shoppingCards")) {
        cards = JSON.parse(localStorage.getItem("shoppingCards"));
    }
    const shoppingCardCountElement = document.getElementById("shopping-card-count");
    shoppingCardCountElement.innerHTML = cards.length;
}




