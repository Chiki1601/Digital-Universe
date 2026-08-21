using System.Collections.Concurrent;
using server.Models.Domain;
using server.Repositories.Interfaces;

namespace server.Repositories.InMemory;

/// <summary>
/// Seeds and serves platform definitions from an in-memory collection.
/// No database is used anywhere in this project - state resets on restart.
/// </summary>
public sealed class InMemoryPlatformRepository : IPlatformRepository
{
    private readonly ConcurrentDictionary<string, PlatformDefinition> _platforms;

    public InMemoryPlatformRepository()
    {
        _platforms = new ConcurrentDictionary<string, PlatformDefinition>(
            Seed().ToDictionary(p => p.Id, StringComparer.OrdinalIgnoreCase),
            StringComparer.OrdinalIgnoreCase);
    }

    public IReadOnlyList<PlatformDefinition> GetAll() => _platforms.Values.OrderBy(p => p.Name).ToList();

    public PlatformDefinition? GetById(string id) =>
        _platforms.TryGetValue(id, out var platform) ? platform : null;

    private static IEnumerable<PlatformDefinition> Seed()
    {
        var defaultLayout = new LayoutConfiguration { Hero = true, Sidebar = false, Search = true };

        yield return Build("cineverse", "Netflix", PlatformCategory.Ott, "cinematic",
            "Stories for every mood.",
            "A cinematic streaming experience for movies, series, and documentaries.",
            defaultLayout,
            HeroCarouselSections("Trending Now", "Popular Movies", "New Releases"));

        yield return Build("streambox", "Amazon Prime Video", PlatformCategory.Ott, "cinematic",
            "Stream without limits.",
            "An on-demand video platform built around movies, series, and originals.",
            defaultLayout,
            HeroCarouselSections("Continue Watching", "Top Picks For You", "Award-Winning Series"));

        yield return Build("seriesworld", "Disney+ Hotstar", PlatformCategory.Ott, "cinematic",
            "Your world of entertainment.",
            "A streaming platform for series, sports, movies, and family entertainment.",
            defaultLayout,
            HeroCarouselSections("Binge This Week", "Fan Favorites", "Coming Soon"));

        yield return Build("soundwave", "Spotify", PlatformCategory.Music, "music",
            "Music for every moment.",
            "A music streaming experience built for discovery, playlists, and podcasts.",
            defaultLayout,
            HeroCarouselSections("Made For You", "Top Charts", "New Releases"));

        yield return Build("tunespace", "YouTube Music", PlatformCategory.Music, "music",
            "Your sound, your space.",
            "A music platform connecting official tracks, live performances, and artists.",
            defaultLayout,
            HeroCarouselSections("Recently Played", "Trending Artists", "Playlists For You"));

        yield return Build("socialhub", "Instagram", PlatformCategory.Social, "social",
            "Capture and share the moment.",
            "A visual community for photos, short videos, stories, and conversations.",
            new LayoutConfiguration { Hero = false, Sidebar = true, Search = true },
            FeedSections("Stories", "Feed", "Suggested For You"));

        yield return Build("connectly", "Facebook", PlatformCategory.Social, "social",
            "Connect with the people who matter.",
            "A social network for communities, groups, events, and everyday updates.",
            new LayoutConfiguration { Hero = false, Sidebar = true, Search = true },
            FeedSections("Stories", "Feed", "Nearby Friends"));

        yield return Build("pronetwork", "YouTube", PlatformCategory.Social, "social",
            "Share what inspires you.",
            "A video community for creators, channels, subscriptions, and live streams.",
            new LayoutConfiguration { Hero = false, Sidebar = true, Search = true },
            FeedSections("Your Groups", "Feed", "Discover Communities"));

        yield return Build("shopsphere", "Amazon Marketplace", PlatformCategory.Shopping, "commerce",
            "Shop the sphere.",
            "A general marketplace with curated collections and deals.",
            defaultLayout,
            CommerceSections("Deals Of The Day", "Trending Products", "Recommended For You"));

        yield return Build("fashionhub", "Flipkart Fashion", PlatformCategory.Shopping, "commerce",
            "Style, curated.",
            "A fashion-first shopping destination with seasonal drops.",
            defaultLayout,
            CommerceSections("New Arrivals", "Editor's Picks", "Trending Styles"));

        yield return Build("marketzone", "Myntra Marketplace", PlatformCategory.Shopping, "commerce",
            "Everything, nearby.",
            "A marketplace connecting local sellers with shoppers.",
            defaultLayout,
            CommerceSections("Flash Deals", "Popular Nearby", "Top Rated Sellers"));

        yield return Build("newsspace", "Google News", PlatformCategory.News, "editorial",
            "Stay informed, stay ahead.",
            "A breaking-news platform with in-depth original reporting.",
            new LayoutConfiguration { Hero = true, Sidebar = true, Search = true },
            NewsSections("Breaking News", "Top Stories", "Trending Topics"));

        yield return Build("dailysphere", "The Daily News", PlatformCategory.News, "editorial",
            "Your daily perspective.",
            "A curated daily digest of original long-form journalism.",
            new LayoutConfiguration { Hero = true, Sidebar = true, Search = true },
            NewsSections("Today's Highlights", "Deep Dives", "Editor's Picks"));

        yield return Build("creatorspace", "YouTube Studio", PlatformCategory.Creator, "creator",
            "Create without limits.",
            "A platform for creators to publish, grow, and engage an audience.",
            new LayoutConfiguration { Hero = true, Sidebar = false, Search = true },
            CreatorSections("Featured Creators", "Trending Content", "Rising Stars"));

        yield return Build("contenthub", "Substack", PlatformCategory.Creator, "creator",
            "Your content, amplified.",
            "A multi-format publishing platform for independent creators.",
            new LayoutConfiguration { Hero = true, Sidebar = false, Search = true },
            CreatorSections("Editor's Picks", "Trending Now", "New Creators"));

        yield return Build("careerconnect", "LinkedIn", PlatformCategory.Professional, "professional",
            "Build your career story.",
            "A professional networking platform for careers and connections.",
            new LayoutConfiguration { Hero = true, Sidebar = true, Search = true },
            ProfessionalSections("Your Feed", "Jobs For You", "People You May Know"));

        yield return Build("worksphere", "Indeed", PlatformCategory.Professional, "professional",
            "Work, connected.",
            "A professional platform focused on hiring and team building.",
            new LayoutConfiguration { Hero = true, Sidebar = true, Search = true },
            ProfessionalSections("Recommended Jobs", "Your Network", "Companies Hiring"));
    }

    private static PlatformDefinition Build(
        string id,
        string name,
        PlatformCategory category,
        string themeId,
        string tagline,
        string description,
        LayoutConfiguration layout,
        IReadOnlyList<SectionDefinition> sections) => new()
        {
            Id = id,
            Name = name,
            Category = category,
            ThemeId = themeId,
            Tagline = tagline,
            Description = description,
            Layout = layout,
            Sections = sections
        };

    private static IReadOnlyList<SectionDefinition> HeroCarouselSections(params string[] carouselTitles) =>
        BuildSections("hero", carouselTitles);

    private static IReadOnlyList<SectionDefinition> FeedSections(params string[] carouselTitles) =>
        BuildSections("stories", carouselTitles);

    private static IReadOnlyList<SectionDefinition> CommerceSections(params string[] carouselTitles) =>
        BuildSections("hero", carouselTitles);

    private static IReadOnlyList<SectionDefinition> NewsSections(params string[] carouselTitles) =>
        BuildSections("hero", carouselTitles);

    private static IReadOnlyList<SectionDefinition> CreatorSections(params string[] carouselTitles) =>
        BuildSections("hero", carouselTitles);

    private static IReadOnlyList<SectionDefinition> ProfessionalSections(params string[] carouselTitles) =>
        BuildSections("hero", carouselTitles);

    private static IReadOnlyList<SectionDefinition> BuildSections(string leadType, string[] carouselTitles)
    {
        var sections = new List<SectionDefinition>
        {
            new() { Type = leadType, Order = 0 }
        };

        for (var i = 0; i < carouselTitles.Length; i++)
        {
            sections.Add(new SectionDefinition
            {
                Type = "carousel",
                Title = carouselTitles[i],
                Order = i + 1
            });
        }

        return sections;
    }
}
