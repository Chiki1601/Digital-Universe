using System.Collections.Concurrent;
using server.Models.Domain;
using server.Repositories.Interfaces;

namespace server.Repositories.InMemory;

/// <summary>
/// Seeds and serves theme definitions from an in-memory collection.
/// No database is used anywhere in this project - state resets on restart.
/// </summary>
public sealed class InMemoryThemeRepository : IThemeRepository
{
    private readonly ConcurrentDictionary<string, ThemeDefinition> _themes;

    public InMemoryThemeRepository()
    {
        _themes = new ConcurrentDictionary<string, ThemeDefinition>(
            Seed().ToDictionary(t => t.Id, StringComparer.OrdinalIgnoreCase),
            StringComparer.OrdinalIgnoreCase);
    }

    public IReadOnlyList<ThemeDefinition> GetAll() => _themes.Values.OrderBy(t => t.Id).ToList();

    public ThemeDefinition? GetById(string id) =>
        _themes.TryGetValue(id, out var theme) ? theme : null;

    private static IEnumerable<ThemeDefinition> Seed()
    {
        yield return new ThemeDefinition
        {
            Id = "cinematic",
            Name = "Cinematic",
            PrimaryColor = "#e50914",
            SecondaryColor = "#b20710",
            BackgroundColor = "#0b0d14",
            SurfaceColor = "#15181f",
            TextColor = "#f5f5f7",
            MutedTextColor = "#9a9ba5",
            CardStyle = "elevated",
            BorderRadius = "12px",
            FontFamily = "'Poppins', sans-serif"
        };

        yield return new ThemeDefinition
        {
            Id = "music",
            Name = "Music",
            PrimaryColor = "#1db954",
            SecondaryColor = "#ff0000",
            BackgroundColor = "#0a0a0c",
            SurfaceColor = "#181818",
            TextColor = "#ffffff",
            MutedTextColor = "#b3b3b3",
            CardStyle = "flat",
            BorderRadius = "8px",
            FontFamily = "'Circular', 'Segoe UI', sans-serif"
        };

        yield return new ThemeDefinition
        {
            Id = "social",
            Name = "Social",
            PrimaryColor = "#e1306c",
            SecondaryColor = "#f77737",
            BackgroundColor = "#f7f8fc",
            SurfaceColor = "#ffffff",
            TextColor = "#1a1c2b",
            MutedTextColor = "#6b6f85",
            CardStyle = "elevated",
            BorderRadius = "16px",
            FontFamily = "'Inter', sans-serif"
        };

        yield return new ThemeDefinition
        {
            Id = "commerce",
            Name = "Commerce",
            PrimaryColor = "#ff9900",
            SecondaryColor = "#2874f0",
            BackgroundColor = "#fafafa",
            SurfaceColor = "#ffffff",
            TextColor = "#1c1c1c",
            MutedTextColor = "#767676",
            CardStyle = "outlined",
            BorderRadius = "10px",
            FontFamily = "'Inter', sans-serif"
        };

        yield return new ThemeDefinition
        {
            Id = "editorial",
            Name = "Editorial",
            PrimaryColor = "#c1121f",
            SecondaryColor = "#003049",
            BackgroundColor = "#fefefe",
            SurfaceColor = "#f5f2ea",
            TextColor = "#141414",
            MutedTextColor = "#5c5c5c",
            CardStyle = "flat",
            BorderRadius = "4px",
            FontFamily = "'Merriweather', serif"
        };

        yield return new ThemeDefinition
        {
            Id = "creator",
            Name = "Creator",
            PrimaryColor = "#f72585",
            SecondaryColor = "#7209b7",
            BackgroundColor = "#0f0a1a",
            SurfaceColor = "#1c1430",
            TextColor = "#f5f0ff",
            MutedTextColor = "#a99fc2",
            CardStyle = "glass",
            BorderRadius = "18px",
            FontFamily = "'Poppins', sans-serif"
        };

        yield return new ThemeDefinition
        {
            Id = "professional",
            Name = "Professional",
            PrimaryColor = "#0a66c2",
            SecondaryColor = "#2e4057",
            BackgroundColor = "#f3f6f8",
            SurfaceColor = "#ffffff",
            TextColor = "#1b1f23",
            MutedTextColor = "#5e6b74",
            CardStyle = "outlined",
            BorderRadius = "6px",
            FontFamily = "'Inter', sans-serif"
        };
    }
}
