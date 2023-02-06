using AutoMapper;
using Domain.Entities;
using Repository.Repositories.Interfaces;
using Service.DTOs.Product;
using Service.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repo;
        private readonly IMapper  _mapper;
        public ProductService(IProductRepository repo,IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task CreateAsync(ProductCreateDTO product)
        {
            var mappedData = _mapper.Map<Product>(product);

            await _repo.Create(mappedData);
        }

        public async Task<List<ProductListDTO>> GetAllAsync()
        {

            return _mapper.Map<List<ProductListDTO>>(await _repo.GetAll());
        }

        public async Task DeleteAsync(int id)
        {
            Product product = await _repo.Get(id);

            await _repo.Delete(product);

        }

        public async Task SoftDeleteAsync(int id)
        {
            Product product = await _repo.Get(id);

            await _repo.SoftDelete(product);
        }

        public async Task UpdateAsync(int id, ProductUpdateDTO product)
        {
            var dbProduct = await _repo.Get(id);

            _mapper.Map(product, dbProduct);

            await _repo.Update(dbProduct);
        }

        public async Task<List<ProductListDTO>> SearchAsync(string? searchText)
        {
            List<Product> searchDatas = new();

            if(searchText != null)
            {
                searchDatas = await _repo.FindAllAsync(m => m.Name.Contains(searchText));
            }
            else
            {
                searchDatas = await _repo.GetAll();
            }

            return _mapper.Map<List<ProductListDTO>>(searchDatas);

            //return _mapper.Map<List<ProductListDTO>>(await _repo.FindAllAsync(m => m.Name.Contains(searchText)));

            
        }

        public async Task<ProductGetDTO> GetByIdAsync(int id)
        {
            var mappedProduct = _mapper.Map<ProductGetDTO>(await _repo.Get(id));

            return mappedProduct;
        }
    }
}
