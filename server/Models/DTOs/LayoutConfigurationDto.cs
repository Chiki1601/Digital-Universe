namespace server.Models.DTOs;

public sealed class LayoutConfigurationDto
{
    public required bool Hero { get; init; }
    public required bool Sidebar { get; init; }
    public required bool Search { get; init; }
}
