using server.Models.DTOs;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services.Implementations;

public sealed class CategoryService(ICategoryRepository categoryRepository) : ICategoryService
{
    public IReadOnlyList<CategoryDto> GetByPlatform(string platformId) =>
        categoryRepository.GetByPlatform(platformId)
            .Select(c => new CategoryDto { Id = c.Id, PlatformId = c.PlatformId, Name = c.Name, Icon = c.Icon })
            .ToList();
}
