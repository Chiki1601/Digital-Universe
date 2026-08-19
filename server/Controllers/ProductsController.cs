using Microsoft.AspNetCore.Mvc;
using server.Services.Interfaces;

namespace server.Controllers;

[ApiController]
[Route("api/products")]
public sealed class ProductsController(IProductService productService) : ControllerBase
{
    [HttpGet]
    public IActionResult GetByPlatform([FromQuery] string platformId)
    {
        if (string.IsNullOrWhiteSpace(platformId))
        {
            return BadRequest(new { message = "The platformId query parameter is required." });
        }

        return Ok(productService.GetByPlatform(platformId));
    }

    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        var product = productService.GetById(id);
        return product is null ? NotFound() : Ok(product);
    }
}
