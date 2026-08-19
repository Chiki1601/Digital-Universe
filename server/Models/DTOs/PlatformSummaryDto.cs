namespace server.Models.DTOs;

public sealed class PlatformSummaryDto
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public required string Category { get; init; }
    public required string Tagline { get; init; }
    public required string ThemeId { get; init; }
}
