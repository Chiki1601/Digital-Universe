using System.Collections.Concurrent;
using server.Models.Domain;
using server.Repositories.Interfaces;

namespace server.Repositories.InMemory;

/// <summary>
/// Seeds and serves fictional platform definitions from an in-memory collection.
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

        yield return Build("cineverse", "CineVerse", PlatformCategory.Ott, "cinematic",
            "Every story, in one universe.",
            "A cinematic streaming experience for original films and series.",
            defaultLayout,
            HeroCarouselSections("Trending Now", "Popular Movies", "New Releases"));

        yield return Build("streambox", "StreamBox", PlatformCategory.Ott, "cinematic",
            "Stream without limits.",
            "An on-demand video platform built around binge-worthy originals.",
            defaultLayout,
            HeroCarouselSections("Continue Watching", "Top Picks For You", "Award-Winning Series"));

        yield return Build("seriesworld", "SeriesWorld", PlatformCategory.Ott, "cinematic",
            "Series-first streaming.",
            "A platform dedicated entirely to serialized storytelling.",
            defaultLayout,
            HeroCarouselSections("Binge This Week", "Fan Favorites", "Coming Soon"));

        yield return Build("soundwave", "SoundWave", PlatformCategory.Music, "music",
            "Feel every frequency.",
            "A music streaming experience built for discovery.",
            defaultLayout,
            HeroCarouselSections("Made For You", "Top Charts", "New Releases"));

        yield return Build("tunespace", "TuneSpace", PlatformCategory.Music, "music",
            "Your sound, your space.",
            "A social-first music platform connecting artists and listeners.",
            defaultLayout,
            HeroCarouselSections("Recently Played", "Trending Artists", "Playlists For You"));

        yield return Build("socialhub", "SocialHub", PlatformCategory.Social, "social",
            "Connect. Share. Belong.",
            "A community feed platform for sharing moments that matter.",
            new LayoutConfiguration { Hero = false, Sidebar = true, Search = true },
            FeedSections("Stories", "Feed", "Suggested For You"));

        yield return Build("connectly", "Connectly", PlatformCategory.Social, "social",
            "Every connection counts.",
            "A messaging-forward social platform focused on close circles.",
            new LayoutConfiguration { Hero = false, Sidebar = true, Search = true },
            FeedSections("Stories", "Feed", "Nearby Friends"));

        yield return Build("pronetwork", "ProNetwork", PlatformCategory.Social, "social",
            "Where communities grow.",
            "A group-centric social platform for shared interests.",
            new LayoutConfiguration { Hero = false, Sidebar = true, Search = true },
            FeedSections("Your Groups", "Feed", "Discover Communities"));

        yield return Build("shopsphere", "ShopSphere", PlatformCategory.Shopping, "commerce",
            "Shop the sphere.",
            "A general marketplace with curated collections and deals.",
            defaultLayout,
            CommerceSections("Deals Of The Day", "Trending Products", "Recommended For You"));

        yield return Build("fashionhub", "FashionHub", PlatformCategory.Shopping, "commerce",
            "Style, curated.",
            "A fashion-first shopping destination with seasonal drops.",
            defaultLayout,
            CommerceSections("New Arrivals", "Editor's Picks", "Trending Styles"));

        yield return Build("marketzone", "MarketZone", PlatformCategory.Shopping, "commerce",
            "Everything, nearby.",
            "A marketplace connecting local sellers with shoppers.",
            defaultLayout,
            CommerceSections("Flash Deals", "Popular Nearby", "Top Rated Sellers"));

        yield return Build("newsspace", "NewsSpace", PlatformCategory.News, "editorial",
            "Stay informed, stay ahead.",
            "A breaking-news platform with in-depth original reporting.",
            new LayoutConfiguration { Hero = true, Sidebar = true, Search = true },
            NewsSections("Breaking News", "Top Stories", "Trending Topics"));

        yield return Build("dailysphere", "DailySphere", PlatformCategory.News, "editorial",
            "Your daily perspective.",
            "A curated daily digest of original long-form journalism.",
            new LayoutConfiguration { Hero = true, Sidebar = true, Search = true },
            NewsSections("Today's Highlights", "Deep Dives", "Editor's Picks"));

        yield return Build("creatorspace", "CreatorSpace", PlatformCategory.Creator, "creator",
            "Create without limits.",
            "A platform for creators to publish, grow, and engage an audience.",
            new LayoutConfiguration { Hero = true, Sidebar = false, Search = true },
            CreatorSections("Featured Creators", "Trending Content", "Rising Stars"));

        yield return Build("contenthub", "ContentHub", PlatformCategory.Creator, "creator",
            "Your content, amplified.",
            "A multi-format publishing platform for independent creators.",
            new LayoutConfiguration { Hero = true, Sidebar = false, Search = true },
            CreatorSections("Editor's Picks", "Trending Now", "New Creators"));

        yield return Build("careerconnect", "CareerConnect", PlatformCategory.Professional, "professional",
            "Build your career story.",
            "A professional networking platform for careers and connections.",
            new LayoutConfiguration { Hero = true, Sidebar = true, Search = true },
            ProfessionalSections("Your Feed", "Jobs For You", "People You May Know"));

        yield return Build("worksphere", "WorkSphere", PlatformCategory.Professional, "professional",
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
