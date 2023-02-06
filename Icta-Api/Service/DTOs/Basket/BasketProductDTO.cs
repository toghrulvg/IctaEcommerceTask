using Service.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.DTOs.Basket
{
    public class BasketProductDTO
        {
        public int Quantity { get; set; }
        public int BasketId { get; set; }
        public int ProductId { get; set; }
        public ProductListDTO Product { get; set; }
    }
}
