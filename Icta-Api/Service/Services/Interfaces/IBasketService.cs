using Service.DTOs.Basket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services.Interfaces
{
    public interface IBasketService
    {
        Task AddBasketAsync(int id);
        Task<List<BasketProductDTO>> GetBasketProductsAsync();
        Task DeleteBasketAsync(int id);
    }
}
