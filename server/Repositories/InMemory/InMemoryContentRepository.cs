using System.Collections.Concurrent;
using server.Models.Domain;
using server.Repositories.Interfaces;

namespace server.Repositories.InMemory;

/// <summary>
/// Seeds and serves original, fictional OTT content (movies and series) from an
/// in-memory collection. No database is used anywhere in this project - state
/// resets on restart.
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

        // CineVerse - cinematic feature films
        yield return Build(ref index, "cineverse", "Echoes of Tomorrow", ContentType.Movie,
            ["Sci-Fi", "Drama"], "A physicist discovers her research has been leaking messages from a future that no longer wants to exist.",
            2025, "2h 11m", 4.6, trending: true, popular: true);

        yield return Build(ref index, "cineverse", "The Last Cartographer", ContentType.Movie,
            ["Adventure", "Drama"], "The final mapmaker of a vanishing empire races to chart a coastline before it's erased by rising seas.",
            2024, "2h 4m", 4.3, trending: true, popular: false);

        yield return Build(ref index, "cineverse", "Velvet Horizon", ContentType.Movie,
            ["Drama", "Romance"], "Two rival vineyard families are forced into an uneasy partnership after a shared harvest disaster.",
            2023, "1h 58m", 4.1, trending: false, popular: true);

        yield return Build(ref index, "cineverse", "Ashes & Starlight", ContentType.Movie,
            ["Sci-Fi", "Adventure"], "A salvage crew stumbles on a derelict generation ship still carrying the dreams of its long-dead builders.",
            2025, "2h 20m", 4.5, trending: false, popular: false);

        yield return Build(ref index, "cineverse", "Nightshade Protocol", ContentType.Movie,
            ["Thriller"], "An off-book negotiator has twelve hours to unravel a hostage standoff that isn't what it appears to be.",
            2022, "1h 47m", 4.0, trending: true, popular: false);

        yield return Build(ref index, "cineverse", "Paper Moons", ContentType.Movie,
            ["Romance", "Drama"], "A letter-writer for hire falls for the one client whose words she's forbidden to keep.",
            2023, "1h 52m", 3.9, trending: false, popular: false);

        yield return Build(ref index, "cineverse", "The Glass Kingdom", ContentType.Series,
            ["Fantasy", "Drama"], "A kingdom built entirely of enchanted glass fractures when its youngest heir refuses the throne.",
            2024, "2 Seasons", 4.7, trending: false, popular: true);

        yield return Build(ref index, "cineverse", "Crimson Tide Rising", ContentType.Movie,
            ["Action"], "A retired diver is pulled back into the world she escaped when a sunken cargo resurfaces with her name on it.",
            2021, "2h 2m", 3.8, trending: false, popular: false);

        // StreamBox - binge-worthy originals
        yield return Build(ref index, "streambox", "Fractured Skies", ContentType.Series,
            ["Sci-Fi", "Mystery"], "When the sky splits into overlapping timelines above one city, its residents start living days out of order.",
            2025, "3 Seasons", 4.8, trending: true, popular: true);

        yield return Build(ref index, "streambox", "The Ember Files", ContentType.Series,
            ["Mystery", "Crime"], "A disgraced arson investigator reopens the case that ended her career, one file at a time.",
            2024, "1 Season", 4.4, trending: true, popular: false);

        yield return Build(ref index, "streambox", "Wildfire Season", ContentType.Movie,
            ["Drama"], "A smokejumper crew's final summer together is tested by a fire that refuses to behave like any before it.",
            2023, "1h 56m", 4.2, trending: false, popular: true);

        yield return Build(ref index, "streambox", "Neon Requiem", ContentType.Movie,
            ["Action", "Sci-Fi"], "A courier who runs data through a city that outlawed memory takes one job too many.",
            2022, "1h 49m", 4.0, trending: true, popular: false);

        yield return Build(ref index, "streambox", "Second Sunrise", ContentType.Series,
            ["Drama"], "Survivors of a coastal town rebuild after a storm erases every record of who owned what.",
            2024, "2 Seasons", 3.9, trending: false, popular: false);

        yield return Build(ref index, "streambox", "The Quiet Algorithm", ContentType.Movie,
            ["Thriller", "Sci-Fi"], "An engineer realizes the recommendation engine she built is quietly rewriting the people who use it.",
            2025, "2h 6m", 4.5, trending: false, popular: true);

        yield return Build(ref index, "streambox", "Hollow Harbor", ContentType.Movie,
            ["Horror"], "A lighthouse keeper's replacement finds the log books full of entries dated after his own arrival.",
            2021, "1h 41m", 3.7, trending: false, popular: false);

        yield return Build(ref index, "streambox", "Midnight Cartel", ContentType.Series,
            ["Crime", "Thriller"], "Three rival smuggling families keep an uneasy truce alive by meeting only at midnight, on neutral ground.",
            2023, "2 Seasons", 4.3, trending: true, popular: false);

        // SeriesWorld - series-first storytelling
        yield return Build(ref index, "seriesworld", "The Obsidian Circle", ContentType.Series,
            ["Fantasy", "Drama"], "A council of exiled mages must reunite to stop the very seal they once swore to protect.",
            2025, "2 Seasons", 4.9, trending: true, popular: true);

        yield return Build(ref index, "seriesworld", "Static & Silence", ContentType.Series,
            ["Mystery"], "A late-night radio host starts receiving calls from listeners who haven't been born yet.",
            2024, "1 Season", 4.5, trending: true, popular: false);

        yield return Build(ref index, "seriesworld", "Borrowed Time", ContentType.Series,
            ["Drama"], "Four strangers who each survived the same accident discover they're now sharing more than a scar.",
            2023, "3 Seasons", 4.4, trending: false, popular: true);

        yield return Build(ref index, "seriesworld", "The Architects", ContentType.Series,
            ["Sci-Fi"], "The engineers of humanity's first off-world colony disagree about what they're actually building.",
            2022, "2 Seasons", 4.1, trending: false, popular: false);

        yield return Build(ref index, "seriesworld", "Salt & Iron", ContentType.Series,
            ["Historical Drama"], "A shipbuilder's daughter inherits a failing dockyard and a war she didn't start.",
            2024, "1 Season", 4.2, trending: true, popular: false);

        yield return Build(ref index, "seriesworld", "Afterglow", ContentType.Series,
            ["Romance", "Drama"], "Two former partners keep getting assigned to the same events by a wedding-planning firm that refuses to notice.",
            2023, "1 Season", 3.8, trending: false, popular: false);

        yield return Build(ref index, "seriesworld", "The Deep End", ContentType.Series,
            ["Thriller"], "A marine biologist's routine survey turns up a structure that predates every map of the trench.",
            2025, "1 Season", 4.6, trending: false, popular: true);

        yield return Build(ref index, "seriesworld", "Winter's Ledger", ContentType.Series,
            ["Crime", "Drama"], "A small-town accountant finds a decade of falsified books with her late father's signature on every page.",
            2021, "2 Seasons", 4.0, trending: false, popular: false);
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
