namespace server.Models.DTOs;

public sealed class CategoryDto
{
    public required string Id { get; init; }
    public required string PlatformId { get; init; }
    public required string Name { get; init; }
    public required string Icon { get; init; }
}
