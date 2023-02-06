using AutoMapper;
using Domain.Entities;
using Service.DTOs.Account;
using Service.DTOs.Basket;
using Service.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ProductCreateDTO, Product>();
            CreateMap<ProductUpdateDTO, Product>();
            CreateMap<Product, ProductListDTO>().ReverseMap();
            CreateMap<RegisterDTO, AppUser>().ReverseMap();
            CreateMap<ProductGetDTO, Product>().ReverseMap();
            CreateMap<BasketProductDTO, BasketProduct>().ReverseMap();
            

        }
    }
}
