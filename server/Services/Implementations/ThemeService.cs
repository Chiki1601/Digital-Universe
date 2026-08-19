using server.Models.DTOs;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services.Implementations;

public sealed class ThemeService(IThemeRepository themeRepository) : IThemeService
{
    public IReadOnlyList<ThemeDto> GetAllThemes() =>
        themeRepository.GetAll().Select(ToDto).ToList();

    public ThemeDto? GetThemeById(string id)
    {
        var theme = themeRepository.GetById(id);
        return theme is null ? null : ToDto(theme);
    }

    private static ThemeDto ToDto(Models.Domain.ThemeDefinition theme) => new()
    {
        Id = theme.Id,
        Name = theme.Name,
        PrimaryColor = theme.PrimaryColor,
        SecondaryColor = theme.SecondaryColor,
        BackgroundColor = theme.BackgroundColor,
        SurfaceColor = theme.SurfaceColor,
        TextColor = theme.TextColor,
        MutedTextColor = theme.MutedTextColor,
        CardStyle = theme.CardStyle,
        BorderRadius = theme.BorderRadius,
        FontFamily = theme.FontFamily
    };
}
