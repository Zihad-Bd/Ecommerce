let CartController = {
    productList : [],
    addToCart: function(productId) {
        $.get("https://dummyjson.com/products/" + productId, (response) => {
            let existingCount = $('#cart-item-count').html();
            $('#cart-item-count').html(parseInt(existingCount) + 1);
            this.productList.push(response);
        });
    },
    showProductList : function() {
        console.log(this.productList);
        $("#products-container").html('');
        $.each(this.productList, function (index, product) {
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
        });
    },
    showCart: function () {
        this.showProductList();
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