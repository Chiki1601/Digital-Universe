using server.Models.Domain;
using server.Models.DTOs;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services.Implementations;

public sealed class ContentService(IContentRepository contentRepository) : IContentService
{
    public IReadOnlyList<ContentSummaryDto> GetByPlatform(string platformId) =>
        contentRepository.GetByPlatform(platformId).Select(ToSummaryDto).ToList();

    public ContentDetailDto? GetById(string id)
    {
        var item = contentRepository.GetById(id);
        return item is null ? null : ToDetailDto(item);
    }

    private static ContentSummaryDto ToSummaryDto(ContentItem item) => new()
    {
        Id = item.Id,
        PlatformId = item.PlatformId,
        Title = item.Title,
        Type = item.Type.ToString(),
        Genres = item.Genres,
        Rating = item.Rating,
        IsTrending = item.IsTrending,
        IsPopular = item.IsPopular,
        AccentIndex = item.AccentIndex
    };

    private static ContentDetailDto ToDetailDto(ContentItem item) => new()
    {
        Id = item.Id,
        PlatformId = item.PlatformId,
        Title = item.Title,
        Type = item.Type.ToString(),
        Genres = item.Genres,
        Synopsis = item.Synopsis,
        ReleaseYear = item.ReleaseYear,
        Runtime = item.Runtime,
        Rating = item.Rating,
        AccentIndex = item.AccentIndex
    };
}
