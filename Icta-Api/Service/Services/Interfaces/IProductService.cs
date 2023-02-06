using Domain.Entities;
using Service.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services.Interfaces
{
    public interface IProductService
    {
        Task CreateAsync(ProductCreateDTO product);
        Task<List<ProductListDTO>> GetAllAsync();

        Task DeleteAsync(int id);
        Task SoftDeleteAsync(int id);
        Task UpdateAsync(int id,ProductUpdateDTO product);
        Task<List<ProductListDTO>> SearchAsync(string? searchText);

        Task<ProductGetDTO> GetByIdAsync(int id);
    }
}
