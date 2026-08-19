using Microsoft.AspNetCore.Mvc;
using server.Services.Interfaces;

namespace server.Controllers;

[ApiController]
[Route("api/categories")]
public sealed class CategoriesController(ICategoryService categoryService) : ControllerBase
{
    [HttpGet]
    public IActionResult GetByPlatform([FromQuery] string platformId)
    {
        if (string.IsNullOrWhiteSpace(platformId))
        {
            return BadRequest(new { message = "The platformId query parameter is required." });
        }

        return Ok(categoryService.GetByPlatform(platformId));
    }
}
