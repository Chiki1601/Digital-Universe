namespace server.Models.Domain;

public sealed class ProductCategory
{
    public required string Id { get; init; }
    public required string PlatformId { get; init; }
    public required string Name { get; init; }
    public required string Icon { get; init; }
}
