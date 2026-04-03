namespace KhoPhanMem.Api.Entities;

/// <summary>
/// Lead từ form Liên hệ hoặc Đăng ký tư vấn — một bảng, phân biệt bằng <see cref="Kind"/>.
/// </summary>
public class Lead
{
    public Guid Id { get; set; }
    public LeadKind Kind { get; set; }
    public DateTimeOffset CreatedAt { get; set; }

    /// <summary>Key idempotency (header), tránh trùng khi client retry.</summary>
    public string? IdempotencyKey { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string Locale { get; set; } = "vi";
    public string? Source { get; set; }

    // Contact
    public string? Company { get; set; }
    public string? Service { get; set; }
    public string? Message { get; set; }

    // Registration
    public string? ProductInterest { get; set; }
    public string? JobTitle { get; set; }
    public string? Province { get; set; }
    public string? Headcount { get; set; }
    public bool? ConsentPrivacy { get; set; }
}
