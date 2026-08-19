namespace server.Models.DTOs;

public sealed class ContentSummaryDto
{
    public required string Id { get; init; }
    public required string PlatformId { get; init; }
    public required string Title { get; init; }
    public required string Type { get; init; }
    public required IReadOnlyList<string> Genres { get; init; }
    public required double Rating { get; init; }
    public required bool IsTrending { get; init; }
    public required bool IsPopular { get; init; }
    public required int AccentIndex { get; init; }
}
