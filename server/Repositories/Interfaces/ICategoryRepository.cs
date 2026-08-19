using server.Models.Domain;

namespace server.Repositories.Interfaces;

public interface ICategoryRepository
{
    IReadOnlyList<ProductCategory> GetByPlatform(string platformId);
}
