using System.ComponentModel.DataAnnotations;

namespace KhoPhanMem.Api.Models.Requests;

public class ContactLeadRequest
{
    [Required, MaxLength(256)]
    public string Name { get; set; } = string.Empty;

    [Required, EmailAddress, MaxLength(320)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(50)]
    public string? Phone { get; set; }

    [MaxLength(256)]
    public string? Company { get; set; }

    [MaxLength(256)]
    public string? Service { get; set; }

    [Required, MaxLength(8000)]
    public string Message { get; set; } = string.Empty;

    [MaxLength(10)]
    public string Locale { get; set; } = "vi";

    [MaxLength(128)]
    public string? Source { get; set; }
}
