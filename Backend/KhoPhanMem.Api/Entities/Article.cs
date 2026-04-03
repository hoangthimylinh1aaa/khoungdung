namespace KhoPhanMem.Api.Entities;

public class Article
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Badge { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    /// <summary>UTC — dùng <see cref="DateTime"/> để tương thích ORDER BY trên SQLite.</summary>
    public DateTime PublishedAt { get; set; }
    public string Locale { get; set; } = "vi";
}
