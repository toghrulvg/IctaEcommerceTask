using Microsoft.AspNetCore.Mvc;
using Service.DTOs.Product;
using Service.Services.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace IctaTask.Controllers
{
    public class ProductController : AppController
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductCreateDTO product)
        {
            await _productService.CreateAsync(product);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _productService.GetAllAsync());
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _productService.DeleteAsync(id);
                return Ok();
            }
            catch (NullReferenceException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> SoftDelete(int id)
        {
            try
            {
                await _productService.SoftDeleteAsync(id);
                return Ok();
            }
            catch (NullReferenceException)
            {
                return NotFound();
            }
        }


        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute][Required] int id,ProductUpdateDTO product)
        {
            try
            {
                await _productService.UpdateAsync(id,product);
                return Ok();
            }
            catch (NullReferenceException)
            {
                return NotFound();
            }
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromRoute]string? search)
        {
            return Ok(await _productService.SearchAsync(search));
        }

        [HttpGet]
        public async Task<IActionResult> Get([Required] int id)
        {
            return Ok(await _productService.GetByIdAsync(id));
        }


    }
}
