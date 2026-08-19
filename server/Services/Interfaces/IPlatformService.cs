using server.Models.DTOs;

namespace server.Services.Interfaces;

public interface IPlatformService
{
    IReadOnlyList<PlatformSummaryDto> GetAllPlatforms();
    PlatformSummaryDto? GetPlatformSummary(string id);
    PlatformConfigurationDto? GetPlatformConfiguration(string id);
}
