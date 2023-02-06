using AutoMapper;
using Repository.Repositories.Interfaces;
using Service.DTOs.Basket;
using Service.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class BasketService : IBasketService
    {
        private readonly IBasketRepository _repo;
        private readonly IMapper _mapper;
        public BasketService(IBasketRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task AddBasketAsync(int id)
        {
            await _repo.AddBasketAsync(id);
        }

        public async Task DeleteBasketAsync(int id)
        {
            await _repo.DeleteBasket(id);
        }

        public async Task<List<BasketProductDTO>> GetBasketProductsAsync()
        {
            var basketProducts = await _repo.GetBasketProducts();
            return _mapper.Map<List<BasketProductDTO>>(basketProducts);
        }
    }
}
