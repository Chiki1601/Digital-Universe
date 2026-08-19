using server.Models.Domain;

namespace server.Repositories.Interfaces;

public interface IThemeRepository
{
    IReadOnlyList<ThemeDefinition> GetAll();
    ThemeDefinition? GetById(string id);
}
