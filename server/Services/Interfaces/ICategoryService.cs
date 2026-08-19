using server.Models.DTOs;

namespace server.Services.Interfaces;

public interface ICategoryService
{
    IReadOnlyList<CategoryDto> GetByPlatform(string platformId);
}
