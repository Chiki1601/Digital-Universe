using server.Models.DTOs;

namespace server.Services.Interfaces;

public interface IProductService
{
    IReadOnlyList<ProductSummaryDto> GetByPlatform(string platformId);
    ProductDetailDto? GetById(string id);
}
