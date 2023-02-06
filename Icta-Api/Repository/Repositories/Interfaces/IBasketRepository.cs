﻿using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories.Interfaces
{
    public interface IBasketRepository : IRepository<Basket>
    {
        Task AddBasketAsync(int id);
        Task<List<BasketProduct>> GetBasketProducts();

        Task DeleteBasket(int id);
    }
}
