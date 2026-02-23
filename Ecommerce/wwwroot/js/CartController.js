$(document).ready(function () {
    CartController.getProductsFromLocalStorage();
    $.each(CartController.productList, function (index, product) {
        CartController.addProductIntoDOM(product);
    });
    CartController.setCartProductCount();
});
let CartController = {
    productList : [],
    addToCart: function(productId) {
        $.get("https://dummyjson.com/products/" + productId, (response) => {
            this.getProductsFromLocalStorage();
            this.productList.push(response);
            this.setItemIntoLocalStorage();
            this.addProductIntoDOM(response);
            this.setCartProductCount();
            this.showCart();
        });
    },
    setCartProductCount: function () {
        $('#cart-item-count').html(CartController.productList.length);
    },
    getProductsFromLocalStorage: function () {
        if (localStorage.getItem("cartProducts") !== null) {
            CartController.productList = JSON.parse(localStorage.getItem("cartProducts"));
        }
    },
    setItemIntoLocalStorage: function () {
        localStorage.setItem("cartProducts", JSON.stringify(this.productList));
    },
    addProductIntoDOM : function(product) {
        $("#products-container").append(`
        <div class="col col-12">
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="${product.images[0]}" style="height: 100px" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text"><small class="text-body-secondary">${product.price}</small></p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    `);
    },
    showCart: function () {
        $('#dv-cart').animate({
            right: '0px'
        }, 400);
    },
    hideCart: function () {
        $('#dv-cart').animate({
            right: '-400px'
        }, 400);
    }
}