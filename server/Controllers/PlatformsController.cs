using Microsoft.AspNetCore.Mvc;
using server.Services.Interfaces;

namespace server.Controllers;

[ApiController]
[Route("api/platforms")]
public sealed class PlatformsController(IPlatformService platformService) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(platformService.GetAllPlatforms());

    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        var platform = platformService.GetPlatformSummary(id);
        return platform is null ? NotFound() : Ok(platform);
    }

    [HttpGet("{id}/configuration")]
    public IActionResult GetConfiguration(string id)
    {
        var configuration = platformService.GetPlatformConfiguration(id);
        return configuration is null ? NotFound() : Ok(configuration);
    }
}
