using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Services.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace IctaTask.Controllers
{
    public class BasketController : AppController
    {
        private readonly IBasketService _basketService;

        public BasketController(IBasketService basketService)
        {
            _basketService = basketService;
        }

        
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddBasket([Required][FromQuery] int id)
        {
          
            await _basketService.AddBasketAsync(id);
            return Ok();
        }
        
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetBasketProducts()
        {

            return Ok(await _basketService.GetBasketProductsAsync());
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteBasketProduct([Required][FromQuery] int id)
        {
            await _basketService.DeleteBasketAsync(id);
            return Ok();
        }

    }
}
