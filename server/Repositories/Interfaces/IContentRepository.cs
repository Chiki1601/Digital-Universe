using server.Models.Domain;

namespace server.Repositories.Interfaces;

public interface IContentRepository
{
    IReadOnlyList<ContentItem> GetByPlatform(string platformId);
    ContentItem? GetById(string id);
}
