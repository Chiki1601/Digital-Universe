using server.Models.Domain;
using server.Models.DTOs;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services.Implementations;

public sealed class ProductService(IProductRepository productRepository) : IProductService
{
    public IReadOnlyList<ProductSummaryDto> GetByPlatform(string platformId) =>
        productRepository.GetByPlatform(platformId).Select(ToSummaryDto).ToList();

    public ProductDetailDto? GetById(string id)
    {
        var product = productRepository.GetById(id);
        return product is null ? null : ToDetailDto(product);
    }

    private static ProductSummaryDto ToSummaryDto(Product product) => new()
    {
        Id = product.Id,
        PlatformId = product.PlatformId,
        CategoryId = product.CategoryId,
        Name = product.Name,
        Price = product.Price,
        OriginalPrice = product.OriginalPrice,
        Rating = product.Rating,
        ReviewCount = product.ReviewCount,
        InStock = product.InStock,
        AccentIndex = product.AccentIndex
    };

    private static ProductDetailDto ToDetailDto(Product product) => new()
    {
        Id = product.Id,
        PlatformId = product.PlatformId,
        CategoryId = product.CategoryId,
        Name = product.Name,
        Description = product.Description,
        Price = product.Price,
        OriginalPrice = product.OriginalPrice,
        Rating = product.Rating,
        ReviewCount = product.ReviewCount,
        InStock = product.InStock,
        AccentIndex = product.AccentIndex
    };
}
