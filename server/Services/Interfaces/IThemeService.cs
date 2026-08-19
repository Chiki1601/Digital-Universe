using server.Models.DTOs;

namespace server.Services.Interfaces;

public interface IThemeService
{
    IReadOnlyList<ThemeDto> GetAllThemes();
    ThemeDto? GetThemeById(string id);
}
