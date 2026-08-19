namespace server.Models.DTOs;

public sealed class ProductSummaryDto
{
    public required string Id { get; init; }
    public required string PlatformId { get; init; }
    public required string CategoryId { get; init; }
    public required string Name { get; init; }
    public required decimal Price { get; init; }
    public decimal? OriginalPrice { get; init; }
    public required double Rating { get; init; }
    public required int ReviewCount { get; init; }
    public required bool InStock { get; init; }
    public required int AccentIndex { get; init; }
}
