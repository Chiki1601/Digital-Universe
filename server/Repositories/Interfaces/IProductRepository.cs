using server.Models.Domain;

namespace server.Repositories.Interfaces;

public interface IProductRepository
{
    IReadOnlyList<Product> GetByPlatform(string platformId);
    Product? GetById(string id);
}
