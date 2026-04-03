using KhoPhanMem.Api.Data;
using KhoPhanMem.Api.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KhoPhanMem.Api.Controllers.V1;

[ApiController]
[Route("api/v1/articles")]
public class ArticlesController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<ArticleDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<ArticleDto>>> List(
        [FromQuery] string? tag,
        [FromQuery] string locale = "vi",
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken ct = default)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var q = db.Articles.AsNoTracking().Where(a => a.Locale == locale);
        if (!string.IsNullOrWhiteSpace(tag))
            q = q.Where(a => a.Badge == tag);

        var total = await q.CountAsync(ct);
        var items = await q
            .OrderByDescending(a => a.PublishedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(a => new ArticleDto
            {
                Id = a.Id,
                Slug = a.Slug,
                Badge = a.Badge,
                Title = a.Title,
                Excerpt = a.Excerpt,
                PublishedAt = new DateTimeOffset(a.PublishedAt, TimeSpan.Zero),
                Locale = a.Locale
            })
            .ToListAsync(ct);

        return Ok(new PagedResult<ArticleDto>
        {
            Items = items,
            Total = total,
            Page = page,
            PageSize = pageSize
        });
    }

    [HttpGet("{slug}")]
    [ProducesResponseType(typeof(ArticleDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ArticleDto>> GetBySlug(
        string slug,
        [FromQuery] string locale = "vi",
        CancellationToken ct = default)
    {
        var a = await db.Articles.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Slug == slug && x.Locale == locale, ct);
        if (a is null)
            return NotFound();

        return Ok(new ArticleDto
        {
            Id = a.Id,
            Slug = a.Slug,
            Badge = a.Badge,
            Title = a.Title,
            Excerpt = a.Excerpt,
            PublishedAt = new DateTimeOffset(a.PublishedAt, TimeSpan.Zero),
            Locale = a.Locale
        });
    }
}
