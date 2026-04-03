using System.ComponentModel.DataAnnotations;

namespace KhoPhanMem.Api.Models.Requests;

public class RegistrationLeadRequest
{
    [Required, MaxLength(256)]
    public string FullName { get; set; } = string.Empty;

    [Required, MaxLength(256)]
    public string ProductInterest { get; set; } = string.Empty;

    [Required, EmailAddress, MaxLength(320)]
    public string Email { get; set; } = string.Empty;

    [Required, MaxLength(50)]
    public string Phone { get; set; } = string.Empty;

    [Required, MaxLength(256)]
    public string JobTitle { get; set; } = string.Empty;

    [Required, MaxLength(256)]
    public string Company { get; set; } = string.Empty;

    [Required, MaxLength(128)]
    public string Province { get; set; } = string.Empty;

    [Required, MaxLength(64)]
    public string Headcount { get; set; } = string.Empty;

    [MaxLength(10)]
    public string Locale { get; set; } = "vi";

    [MaxLength(128)]
    public string? Source { get; set; }

    [Required]
    public bool ConsentPrivacy { get; set; }
}
