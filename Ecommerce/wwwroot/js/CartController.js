$(document).ready(function () {
    CartController.getProductsFromLocalStorage();
    $.each(CartController.productList, function (index, productInfo) {
        CartController.addProductIntoDOM(productInfo);
    });
    CartController.setCartProductCount();
});
let CartController = {
    productList : [],
    addToCart: function (productId) {
        this.getProductsFromLocalStorage();
        let exist = false;
        $.each(this.productList, function (index, productInfo) {
            if (productInfo.product.id === productId) {
                exist = true;
                productInfo.count = productInfo.count + 1;
                $("#" + productInfo.product.id + "-product-count").html(productInfo.count);
                $("#" + productInfo.product.id + "-product-price").html(productInfo.product.price * productInfo.count);
                CartController.showCart();
                CartController.setItemIntoLocalStorage();
            } 
        });
        if (!exist) {
            $.get("https://dummyjson.com/products/" + productId, (response) => {
                let productInfo = {
                    product: response,
                    count: 1
                }
                this.productList.push(productInfo);
                this.setItemIntoLocalStorage();
                this.addProductIntoDOM(productInfo);
                this.setCartProductCount();
                this.showCart();
            });
        }
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
    addProductIntoDOM : function(productInfo) {
        $("#products-container").append(`
        <div class="col col-12">
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="${productInfo.product.images[0]}" style="height: 100px" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${productInfo.product.title}</h5>
                    <p class="card-text"><span>-</span><span id="${productInfo.product.id}-product-count" style="padding:8px">${productInfo.count}</span><span>+</span></p>
                    <p class="card-text"><small class="text-body-secondary" id="${productInfo.product.id}-product-price">${productInfo.count * productInfo.product.price}</small></p>
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