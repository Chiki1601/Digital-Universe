using server.Models.Domain;
using server.Models.DTOs;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services.Implementations;

public sealed class PlatformService(
    IPlatformRepository platformRepository,
    IThemeRepository themeRepository) : IPlatformService
{
    public IReadOnlyList<PlatformSummaryDto> GetAllPlatforms() =>
        platformRepository.GetAll().Select(ToSummaryDto).ToList();

    public PlatformSummaryDto? GetPlatformSummary(string id)
    {
        var platform = platformRepository.GetById(id);
        return platform is null ? null : ToSummaryDto(platform);
    }

    public PlatformConfigurationDto? GetPlatformConfiguration(string id)
    {
        var platform = platformRepository.GetById(id);
        if (platform is null)
        {
            return null;
        }

        var theme = themeRepository.GetById(platform.ThemeId);
        if (theme is null)
        {
            return null;
        }

        return new PlatformConfigurationDto
        {
            PlatformId = platform.Id,
            Name = platform.Name,
            Category = platform.Category.ToString(),
            Tagline = platform.Tagline,
            Description = platform.Description,
            Theme = new ThemeDto
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
            },
            Layout = new LayoutConfigurationDto
            {
                Hero = platform.Layout.Hero,
                Sidebar = platform.Layout.Sidebar,
                Search = platform.Layout.Search
            },
            Sections = platform.Sections
                .OrderBy(s => s.Order)
                .Select(s => new SectionDto { Type = s.Type, Title = s.Title, Order = s.Order })
                .ToList()
        };
    }

    private static PlatformSummaryDto ToSummaryDto(PlatformDefinition platform) => new()
    {
        Id = platform.Id,
        Name = platform.Name,
        Category = platform.Category.ToString(),
        Tagline = platform.Tagline,
        ThemeId = platform.ThemeId
    };
}
