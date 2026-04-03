namespace KhoPhanMem.Api.Models.Responses;

public class ArticleDto
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Badge { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public DateTimeOffset PublishedAt { get; set; }
    public string Locale { get; set; } = "vi";
}
