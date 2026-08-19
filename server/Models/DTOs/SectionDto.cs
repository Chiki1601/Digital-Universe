namespace server.Models.DTOs;

public sealed class SectionDto
{
    public required string Type { get; init; }
    public string? Title { get; init; }
    public required int Order { get; init; }
}
