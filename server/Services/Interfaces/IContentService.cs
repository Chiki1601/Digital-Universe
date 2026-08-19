using server.Models.DTOs;

namespace server.Services.Interfaces;

public interface IContentService
{
    IReadOnlyList<ContentSummaryDto> GetByPlatform(string platformId);
    ContentDetailDto? GetById(string id);
}
