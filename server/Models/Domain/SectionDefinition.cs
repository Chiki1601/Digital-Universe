namespace server.Models.Domain;

public sealed class SectionDefinition
{
    public required string Type { get; init; }
    public string? Title { get; init; }
    public int Order { get; init; }
}
