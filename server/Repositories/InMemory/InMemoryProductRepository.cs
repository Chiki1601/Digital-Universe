using System.Collections.Concurrent;
using server.Models.Domain;
using server.Repositories.Interfaces;

namespace server.Repositories.InMemory;

/// <summary>
/// Seeds and serves demo marketplace products from an in-memory collection.
/// Prices, stock, and review counts are illustrative and are not live data.
/// </summary>
public sealed class InMemoryProductRepository : IProductRepository
{
    private readonly ConcurrentDictionary<string, Product> _products;

    public InMemoryProductRepository()
    {
        _products = new ConcurrentDictionary<string, Product>(
            Seed().ToDictionary(p => p.Id, StringComparer.OrdinalIgnoreCase),
            StringComparer.OrdinalIgnoreCase);
    }

    public IReadOnlyList<Product> GetByPlatform(string platformId) =>
        _products.Values
            .Where(p => string.Equals(p.PlatformId, platformId, StringComparison.OrdinalIgnoreCase))
            .OrderBy(p => p.CategoryId)
            .ThenBy(p => p.Name)
            .ToList();

    public Product? GetById(string id) =>
        _products.TryGetValue(id, out var product) ? product : null;

    private static IEnumerable<Product> Seed()
    {
        var index = 0;

        // Real-world reference catalog inspired by common Amazon and Flipkart
        // listings. Product images, checkout, stock, and seller data are demo-only.
        yield return Build(ref index, "shopsphere", "electronics", "Apple iPhone 15",
            "Apple smartphone with a 6.1-inch display, dual camera system, and USB-C connectivity.", 69999m, 79900m, 4.5, 12480, true);
        yield return Build(ref index, "shopsphere", "electronics", "Samsung Galaxy S24",
            "Samsung flagship smartphone with a bright display, advanced camera features, and all-day battery.", 74999m, 84999m, 4.4, 8650, true);
        yield return Build(ref index, "shopsphere", "electronics", "Sony WH-1000XM5",
            "Wireless over-ear headphones with active noise cancellation and high-resolution audio support.", 27990m, 34990m, 4.6, 4380, true);
        yield return Build(ref index, "shopsphere", "computers", "Apple MacBook Air M3",
            "Lightweight laptop powered by Apple silicon with a sharp display and long battery life.", 114990m, 124990m, 4.7, 1890, true);
        yield return Build(ref index, "shopsphere", "smart-home", "Amazon Echo Dot 5th Gen",
            "Compact smart speaker for music, timers, questions, and compatible smart-home controls.", 4499m, 5499m, 4.3, 9150, true);
        yield return Build(ref index, "shopsphere", "books", "Kindle Paperwhite",
            "Waterproof e-reader with a glare-free display and adjustable warm light.", 13999m, 16999m, 4.5, 5320, true);

        yield return Build(ref index, "fashionhub", "footwear", "Nike Air Max 90",
            "Classic Nike lifestyle sneaker with visible Air cushioning and a durable rubber outsole.", 10795m, 12795m, 4.4, 2740, true);
        yield return Build(ref index, "fashionhub", "footwear", "Adidas Ultraboost 23",
            "Performance running shoe with responsive cushioning and a supportive knit upper.", 12999m, 17999m, 4.5, 1980, true);
        yield return Build(ref index, "fashionhub", "accessories", "Ray-Ban Aviator Classic",
            "Iconic metal-frame sunglasses with classic teardrop lenses and UV protection.", 9590m, 11990m, 4.6, 1120, true);

        yield return Build(ref index, "marketzone", "electronics", "Logitech MX Master 3S",
            "Wireless ergonomic mouse with a precise sensor, quiet clicks, and multi-device support.", 7995m, 9995m, 4.6, 3210, true);
        yield return Build(ref index, "marketzone", "home-appliances", "Dyson V15 Detect",
            "Cordless vacuum with intelligent cleaning modes and dust detection technology.", 49900m, 59900m, 4.4, 860, true);
        yield return Build(ref index, "marketzone", "home-living", "LEGO Classic Creative Brick Box",
            "A reusable brick set with colorful pieces for open-ended building and creative play.", 2499m, 2999m, 4.7, 6450, true);

        // Additional original demo products
        yield return Build(ref index, "shopsphere", "electronics", "Pulsewave Earbuds X2",
            "Wireless earbuds tuned for balanced sound with a 28-hour charging case.", 59.99m, 79.99m, 4.5, 212, true);
        yield return Build(ref index, "shopsphere", "electronics", "Lumen Desk Lamp Pro",
            "Adjustable LED desk lamp with three warmth settings and a USB pass-through port.", 34.50m, null, 4.2, 88, true);
        yield return Build(ref index, "shopsphere", "home-living", "Driftwood Throw Blanket",
            "Woven cotton-blend throw in a driftwood weave, machine washable.", 28.00m, null, 4.6, 145, true);
        yield return Build(ref index, "shopsphere", "home-living", "CeramicPour Coffee Set",
            "Hand-glazed ceramic pour-over set with a matching mug for two.", 42.00m, 52.00m, 4.3, 61, true);
        yield return Build(ref index, "shopsphere", "sports-outdoors", "TrailBlaze Hydration Pack",
            "Lightweight 2L hydration pack with a quick-release bite valve.", 45.00m, null, 4.4, 97, true);
        yield return Build(ref index, "shopsphere", "sports-outdoors", "Everslope Yoga Mat",
            "Non-slip yoga mat with alignment guides and a carry strap.", 24.99m, null, 4.1, 53, false);
        yield return Build(ref index, "shopsphere", "beauty-wellness", "Meadowmist Face Serum",
            "Lightweight daily serum with botanical extracts for an even tone.", 22.00m, null, 4.7, 176, true);
        yield return Build(ref index, "shopsphere", "beauty-wellness", "Solstice Bar Soap Trio",
            "Three small-batch bar soaps in citrus, cedar, and oat milk.", 14.50m, 18.00m, 4.0, 39, true);

        // FashionHub - fashion-first
        yield return Build(ref index, "fashionhub", "womens-wear", "Aurora Wrap Dress",
            "Midi wrap dress in a soft crepe with an adjustable waist tie.", 64.00m, null, 4.5, 132, true);
        yield return Build(ref index, "fashionhub", "womens-wear", "Cascade Knit Sweater",
            "Ribbed knit sweater with dropped shoulders in a heathered finish.", 48.00m, 60.00m, 4.3, 84, true);
        yield return Build(ref index, "fashionhub", "mens-wear", "Ridgeline Flannel Shirt",
            "Brushed flannel button-down with a relaxed fit and reinforced seams.", 39.00m, null, 4.2, 71, true);
        yield return Build(ref index, "fashionhub", "mens-wear", "Harbor Chino Trousers",
            "Straight-fit chinos in a stretch cotton twill.", 52.00m, null, 4.4, 66, true);
        yield return Build(ref index, "fashionhub", "footwear", "Northfield Leather Boots",
            "Full-grain leather boots with a stitched welt sole.", 89.00m, 110.00m, 4.6, 158, true);
        yield return Build(ref index, "fashionhub", "footwear", "Glide Canvas Sneakers",
            "Low-top canvas sneakers with a cushioned recycled-foam insole.", 46.00m, null, 4.1, 45, false);
        yield return Build(ref index, "fashionhub", "accessories", "Wanderline Crossbody Bag",
            "Structured crossbody bag in vegetable-tanned leather.", 58.00m, null, 4.5, 103, true);
        yield return Build(ref index, "fashionhub", "accessories", "Solace Wool Scarf",
            "Oversized merino wool scarf in a brushed twill weave.", 26.00m, null, 4.0, 37, true);

        // MarketZone - local marketplace
        yield return Build(ref index, "marketzone", "groceries", "Sunridge Cold-Pressed Honey",
            "Small-batch wildflower honey, cold-pressed from a single apiary.", 9.50m, null, 4.8, 214, true);
        yield return Build(ref index, "marketzone", "groceries", "Hearthstone Sourdough Loaf",
            "Naturally leavened sourdough baked fresh each morning.", 6.00m, null, 4.6, 168, true);
        yield return Build(ref index, "marketzone", "handmade-goods", "Kindling Soy Candle Set",
            "Three hand-poured soy candles in cedar, fig, and sea salt.", 19.00m, 24.00m, 4.4, 92, true);
        yield return Build(ref index, "marketzone", "handmade-goods", "Woven Reed Basket",
            "Hand-woven reed storage basket with reinforced handles.", 32.00m, null, 4.3, 44, true);
        yield return Build(ref index, "marketzone", "local-crafts", "Claybound Pottery Mug",
            "Wheel-thrown stoneware mug, glazed and kiln-fired locally.", 16.00m, null, 4.5, 77, true);
        yield return Build(ref index, "marketzone", "local-crafts", "Riverstone Coaster Set",
            "Set of four polished stone coasters with a cork backing.", 12.00m, null, 4.2, 29, false);
        yield return Build(ref index, "marketzone", "bulk-deals", "Family Pack Pasta Bundle",
            "Six-pack bundle of dried pasta in assorted shapes.", 15.00m, 19.00m, 4.1, 58, true);
        yield return Build(ref index, "marketzone", "bulk-deals", "Harvest Grain Variety Box",
            "Bulk box of oats, quinoa, and farro from local growers.", 27.00m, null, 4.3, 41, true);
    }

    private static Product Build(
        ref int index,
        string platformId,
        string categoryId,
        string name,
        string description,
        decimal price,
        decimal? originalPrice,
        double rating,
        int reviewCount,
        bool inStock)
    {
        var product = new Product
        {
            Id = $"{platformId}-{Slugify(name)}",
            PlatformId = platformId,
            CategoryId = categoryId,
            Name = name,
            Description = description,
            Price = price,
            OriginalPrice = originalPrice,
            Rating = rating,
            ReviewCount = reviewCount,
            InStock = inStock,
            AccentIndex = index % 6
        };

        index++;
        return product;
    }

    private static string Slugify(string name) =>
        name.ToLowerInvariant().Replace("'", "").Replace(" ", "-");
}
