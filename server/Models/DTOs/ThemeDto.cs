namespace server.Models.DTOs;

public sealed class ThemeDto
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public required string PrimaryColor { get; init; }
    public required string SecondaryColor { get; init; }
    public required string BackgroundColor { get; init; }
    public required string SurfaceColor { get; init; }
    public required string TextColor { get; init; }
    public required string MutedTextColor { get; init; }
    public required string CardStyle { get; init; }
    public required string BorderRadius { get; init; }
    public required string FontFamily { get; init; }
}
