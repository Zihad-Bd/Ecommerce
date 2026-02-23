using Ecommerce.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Ecommerce.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        //public JsonResult Products()
        //{
        //    var product = new 
        //    {
        //        name = "shampoo",
        //        category = "hair care",
        //    };
        //    List<object> Products = new List<object>();
        //    Products.Add(product);
        //    return Json(Products);
        //}
        [HttpGet]
        public IActionResult Products()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetSingleProduct(int productId)
        {
            var product = new Product();
            product.id = 1;
            product.title = "Essence Mascara Lash Princess";
            product.description = "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.";
            product.category = "beauty";
            product.price = 9.99;
            product.tags = ["beauty", "mascara"];
            Dimensions dimensions = new Dimensions();
            dimensions.width = 15.14;
            dimensions.height = 13.08;
            dimensions.depth = 22.99;
            product.dimensions = dimensions;
            Review review1 = new Review();
            review1.rating = 5;
            review1.comment = "This mascara is amazing! It gives my lashes great volume and length.";
            review1.date = DateTime.Now.AddDays(-10);
            review1.reviewerName = "Jane Doe";
            review1.reviewerEmail = "zihad@gmail.com";
            product.reviews.Add(review1);
            Review review2 = new Review();
            review2.rating = 4;
            review2.comment = "I like this mascara, but it can be a bit clumpy if you apply too much.";
            review2.date = DateTime.Now.AddDays(-5);
            review2.reviewerName = "John Smith";
            review2.reviewerEmail = "john@gmail.com";
            product.reviews.Add(review2);
            Review review3 = new Review();
            review3.rating = 3;
            review3.comment = "It's an okay mascara, but I've used better ones before.";
            review3.date = DateTime.Now.AddDays(-2);
            review3.reviewerName = "Emily Johnson";
            review3.reviewerEmail = "emily@yahoo.com";
            product.reviews.Add(review3);
            return Json(product);
        }

        [HttpPost]
        public JsonResult SaveProduct([FromBody]Product product)
        {
            return Json(product);
        }
    }
}
