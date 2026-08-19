using server.Repositories.InMemory;
using server.Repositories.Interfaces;
using server.Services.Implementations;
using server.Services.Interfaces;

namespace server.Extensions;

public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Registers all Digital Universe repositories and services. Repositories are
    /// singletons because they hold the in-memory dataset for the lifetime of the process.
    /// </summary>
    public static IServiceCollection AddDigitalUniverseServices(this IServiceCollection services)
    {
        services.AddSingleton<IPlatformRepository, InMemoryPlatformRepository>();
        services.AddSingleton<IThemeRepository, InMemoryThemeRepository>();
        services.AddSingleton<IContentRepository, InMemoryContentRepository>();
        services.AddSingleton<ICategoryRepository, InMemoryCategoryRepository>();
        services.AddSingleton<IProductRepository, InMemoryProductRepository>();

        services.AddScoped<IPlatformService, PlatformService>();
        services.AddScoped<IThemeService, ThemeService>();
        services.AddScoped<IContentService, ContentService>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IProductService, ProductService>();

        return services;
    }

    public static IServiceCollection AddDigitalUniverseCors(this IServiceCollection services, string policyName)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(policyName, policy =>
            {
                policy
                    .WithOrigins("http://localhost:4200", "https://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        return services;
    }
}
