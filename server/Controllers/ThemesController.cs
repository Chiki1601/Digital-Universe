using Microsoft.AspNetCore.Mvc;
using server.Services.Interfaces;

namespace server.Controllers;

[ApiController]
[Route("api/themes")]
public sealed class ThemesController(IThemeService themeService) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(themeService.GetAllThemes());

    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        var theme = themeService.GetThemeById(id);
        return theme is null ? NotFound() : Ok(theme);
    }
}
