using server.Models.Domain;

namespace server.Repositories.Interfaces;

public interface IPlatformRepository
{
    IReadOnlyList<PlatformDefinition> GetAll();
    PlatformDefinition? GetById(string id);
}
