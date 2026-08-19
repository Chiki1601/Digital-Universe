namespace server.Models.DTOs;

public sealed class PlatformConfigurationDto
{
    public required string PlatformId { get; init; }
    public required string Name { get; init; }
    public required string Category { get; init; }
    public required string Tagline { get; init; }
    public required string Description { get; init; }
    public required ThemeDto Theme { get; init; }
    public required LayoutConfigurationDto Layout { get; init; }
    public required IReadOnlyList<SectionDto> Sections { get; init; }
}
