namespace server.Models.Domain;

public sealed class PlatformDefinition
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public required PlatformCategory Category { get; init; }
    public required string ThemeId { get; init; }
    public required string Tagline { get; init; }
    public required string Description { get; init; }
    public required LayoutConfiguration Layout { get; init; }
    public required IReadOnlyList<SectionDefinition> Sections { get; init; }
}
