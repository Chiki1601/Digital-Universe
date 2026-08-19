using System.Collections.Concurrent;
using server.Models.Domain;
using server.Repositories.Interfaces;

namespace server.Repositories.InMemory;

/// <summary>
/// Seeds and serves product categories per shopping platform from an in-memory
/// collection. No database is used anywhere in this project - state resets on restart.
/// </summary>
public sealed class InMemoryCategoryRepository : ICategoryRepository
{
    private readonly IReadOnlyList<ProductCategory> _categories;

    public InMemoryCategoryRepository()
    {
        _categories = Seed().ToList();
    }

    public IReadOnlyList<ProductCategory> GetByPlatform(string platformId) =>
        _categories
            .Where(c => string.Equals(c.PlatformId, platformId, StringComparison.OrdinalIgnoreCase))
            .ToList();

    private static IEnumerable<ProductCategory> Seed()
    {
        yield return Build("shopsphere", "electronics", "Electronics", "🔌");
        yield return Build("shopsphere", "home-living", "Home & Living", "🏠");
        yield return Build("shopsphere", "sports-outdoors", "Sports & Outdoors", "🏕️");
        yield return Build("shopsphere", "beauty-wellness", "Beauty & Wellness", "🧴");

        yield return Build("fashionhub", "womens-wear", "Women's Wear", "👗");
        yield return Build("fashionhub", "mens-wear", "Men's Wear", "👔");
        yield return Build("fashionhub", "footwear", "Footwear", "👟");
        yield return Build("fashionhub", "accessories", "Accessories", "👜");

        yield return Build("marketzone", "groceries", "Groceries", "🥖");
        yield return Build("marketzone", "handmade-goods", "Handmade Goods", "🕯️");
        yield return Build("marketzone", "local-crafts", "Local Crafts", "🏺");
        yield return Build("marketzone", "bulk-deals", "Bulk Deals", "📦");
    }

    private static ProductCategory Build(string platformId, string id, string name, string icon) => new()
    {
        Id = id,
        PlatformId = platformId,
        Name = name,
        Icon = icon
    };
}
