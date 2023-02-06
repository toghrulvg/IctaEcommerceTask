using Domain.Entities;
using Repository.Data;
using Repository.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class ProductRepository : Repository<Product> , IProductRepository
    {
        public ProductRepository(AppDbContext context): base(context)
        {

        }
    }
}
