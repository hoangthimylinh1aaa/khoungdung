namespace KhoPhanMem.Api.Models.Responses;

public class LeadCreatedResponse
{
    public Guid Id { get; set; }
    public string Status { get; set; } = "received";
    public string Message { get; set; } = string.Empty;
}
