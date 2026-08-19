using Microsoft.AspNetCore.Mvc;
using server.Services.Interfaces;

namespace server.Controllers;

[ApiController]
[Route("api/content")]
public sealed class ContentController(IContentService contentService) : ControllerBase
{
    [HttpGet]
    public IActionResult GetByPlatform([FromQuery] string platformId)
    {
        if (string.IsNullOrWhiteSpace(platformId))
        {
            return BadRequest(new { message = "The platformId query parameter is required." });
        }

        return Ok(contentService.GetByPlatform(platformId));
    }

    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        var content = contentService.GetById(id);
        return content is null ? NotFound() : Ok(content);
    }
}
