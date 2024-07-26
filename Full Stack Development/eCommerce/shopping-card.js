shoppingCards = []; 


if(localStorage.getItem("shoppingCards")){
    shoppingCards = JSON.parse(localStorage.getItem("shoppingCards")); //JSON.parse ile stringe dönüştürmemizin sebebi LocalStorage da işlemeler string ifade ile tanımlı olmak zorunda.
}

setShoppingCardToHTML();
setShoppingCardCountUsingLocalStoreAge();


function setShoppingCardToHTML() {
    /*Döngüden önceki kayıtları siler bu sayede artarak giden kayıt şeklinin önüne geçilmiş olunur */
    const shoppingCardsRowElement = document.getElementById('shoppingCardsRow');
    shoppingCardsRowElement.innerHTML = "";

    for(const index in shoppingCards){
        const shoppingCard = shoppingCards[index];
        const text = `
        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mt-2">
            <div class="card">
                <div class="card-body product-image-div">
                    <img src="${shoppingCard.image}" alt="" style="width: 100%; max-height:100%">
                    </div>
                    <div class="card-header product-name-div">
                        <h5>${shoppingCard.name.substring(0,84)}</h5>
                    </div>
                    <div class="card-body">
                        <h4 class="alert alert-danger text-center w-100">
                            ${formatCurency(shoppingCard.price)}
                        </h4>
                        <button onclick="deleteByIndex(${index}, ${shoppingCard.id})" class="btn btn-danger w-100">
                        <i class="bi bi-trash"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </div>`
    
    if(shoppingCardsRowElement !== null) {
        shoppingCardsRowElement.innerHTML += text; //İnnerHTML içerisindeki verileri siler yeniden yazar. Bu yüzden + işareti kullanıyoruz.
    }
    }
}


function setShoppingCardCountUsingLocalStoreAge() {
    let cards = [];
    if(localStorage.getItem("shoppingCards")){
        cards = JSON.parse(localStorage.getItem("shoppingCards"));
    }
    const shoppingCardCountElement = document.getElementById("shopping-card-count");
    shoppingCardCountElement.innerHTML = cards.length;
}

function deleteByIndex(index, id) {

    Swal.fire({
        title: 'Delete',
        text: 'Do you want to delete',
        icon: 'question',
        confirmButtonText: 'Delete',
        showCancelButton: true,
        cancelButtonText: 'Cancel'
      }).then((res)=>{
        console.log(res);
        if(res.isConfirmed){
            this.shoppingCards.splice(index, 1);

            localStorage.setItem("shoppingCards", JSON.stringify(this.shoppingCards));

            const products = JSON.parse(localStorage.getItem("products"));

            const product = products.find(p => p.id === id);
            product.stock += 1;

            localStorage.setItem("products", JSON.stringify(products));

            setShoppingCardToHTML();
            setShoppingCardCountUsingLocalStoreAge();
        }
      });
}