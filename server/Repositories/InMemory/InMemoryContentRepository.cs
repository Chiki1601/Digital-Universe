using System.Collections.Concurrent;
using server.Models.Domain;
using server.Repositories.Interfaces;

namespace server.Repositories.InMemory;

/// <summary>
/// Seeds and serves demo OTT content (movies and series) from an in-memory
/// collection. The catalog uses recognizable real-world titles for UI demos;
/// playback, availability, and licensing are not represented.
/// </summary>
public sealed class InMemoryContentRepository : IContentRepository
{
    private readonly ConcurrentDictionary<string, ContentItem> _content;

    public InMemoryContentRepository()
    {
        _content = new ConcurrentDictionary<string, ContentItem>(
            Seed().ToDictionary(c => c.Id, StringComparer.OrdinalIgnoreCase),
            StringComparer.OrdinalIgnoreCase);
    }

    public IReadOnlyList<ContentItem> GetByPlatform(string platformId) =>
        _content.Values
            .Where(c => string.Equals(c.PlatformId, platformId, StringComparison.OrdinalIgnoreCase))
            .OrderByDescending(c => c.IsTrending)
            .ThenByDescending(c => c.IsPopular)
            .ThenBy(c => c.Title)
            .ToList();

    public ContentItem? GetById(string id) =>
        _content.TryGetValue(id, out var item) ? item : null;

    private static IEnumerable<ContentItem> Seed()
    {
        var index = 0;

        // Real-world reference catalog for the OTT demo. Artwork and playback
        // remain intentionally blank and no external media is bundled.
        yield return Build(ref index, "cineverse", "Inception", ContentType.Movie,
            ["Sci-Fi", "Thriller"], "A skilled extractor enters layered dreams to plant an idea that could change a powerful business empire.",
            2010, "2h 28m", 4.8, trending: true, popular: true);

        yield return Build(ref index, "cineverse", "Interstellar", ContentType.Movie,
            ["Sci-Fi", "Adventure"], "Explorers travel beyond a familiar galaxy in search of a future for humanity.",
            2014, "2h 49m", 4.7, trending: false, popular: true);

        yield return Build(ref index, "cineverse", "The Dark Knight", ContentType.Movie,
            ["Action", "Crime"], "A masked vigilante faces a criminal mastermind who pushes a city and its heroes toward chaos.",
            2008, "2h 32m", 4.9, trending: true, popular: true);

        yield return Build(ref index, "streambox", "The Shawshank Redemption", ContentType.Movie,
            ["Drama"], "A banker sentenced for a crime he says he did not commit builds an unlikely friendship inside prison.",
            1994, "2h 22m", 4.9, trending: false, popular: true);

        yield return Build(ref index, "streambox", "The Office", ContentType.Series,
            ["Comedy"], "The daily routines, rivalries, and friendships of employees at a paper company are captured by a documentary crew.",
            2005, "9 Seasons", 4.6, trending: true, popular: true);

        yield return Build(ref index, "streambox", "Breaking Bad", ContentType.Series,
            ["Crime", "Drama"], "A chemistry teacher makes increasingly dangerous choices after a life-changing diagnosis.",
            2008, "5 Seasons", 4.9, trending: true, popular: true);

        yield return Build(ref index, "seriesworld", "Stranger Things", ContentType.Series,
            ["Sci-Fi", "Mystery"], "A group of friends uncover strange experiments and a hidden world beneath their small town.",
            2016, "4 Seasons", 4.5, trending: true, popular: true);

        yield return Build(ref index, "seriesworld", "Game of Thrones", ContentType.Series,
            ["Fantasy", "Drama"], "Several powerful families compete for control of a contested throne while an ancient threat returns.",
            2011, "8 Seasons", 4.4, trending: false, popular: true);

        yield return Build(ref index, "cineverse", "Avatar", ContentType.Movie,
            ["Sci-Fi", "Adventure"], "A former marine joins a distant world and must choose where his loyalty belongs.",
            2009, "2h 42m", 4.5, trending: false, popular: true);

        yield return Build(ref index, "streambox", "Friends", ContentType.Series,
            ["Comedy", "Romance"], "Six friends navigate work, relationships, and adulthood together in New York City.",
            1994, "10 Seasons", 4.6, trending: false, popular: true);

        yield return Build(ref index, "seriesworld", "Wednesday", ContentType.Series,
            ["Comedy", "Mystery"], "A clever student investigates a mystery at her unusual boarding school while mastering new abilities.",
            2022, "1 Season", 4.4, trending: true, popular: true);

    }

    private static ContentItem Build(
        ref int index,
        string platformId,
        string title,
        ContentType type,
        IReadOnlyList<string> genres,
        string synopsis,
        int releaseYear,
        string runtime,
        double rating,
        bool trending,
        bool popular)
    {
        var item = new ContentItem
        {
            Id = $"{platformId}-{Slugify(title)}",
            PlatformId = platformId,
            Title = title,
            Type = type,
            Genres = genres,
            Synopsis = synopsis,
            ReleaseYear = releaseYear,
            Runtime = runtime,
            Rating = rating,
            IsTrending = trending,
            IsPopular = popular,
            AccentIndex = index % 6
        };

        index++;
        return item;
    }

    private static string Slugify(string title) =>
        title.ToLowerInvariant().Replace(" & ", "-").Replace("'", "").Replace(" ", "-");
}
