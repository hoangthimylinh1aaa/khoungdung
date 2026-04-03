using KhoPhanMem.Api.Data;
using KhoPhanMem.Api.Entities;
using KhoPhanMem.Api.Models.Requests;
using KhoPhanMem.Api.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KhoPhanMem.Api.Controllers.V1;

[ApiController]
[Route("api/v1/leads")]
public class LeadsController(AppDbContext db) : ControllerBase
{
    /// <summary>Form liên hệ (/contact).</summary>
    [HttpPost("contact")]
    [ProducesResponseType(typeof(LeadCreatedResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(LeadCreatedResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> CreateContact(
        [FromBody] ContactLeadRequest body,
        CancellationToken ct)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var idem = Request.Headers["Idempotency-Key"].FirstOrDefault();
        if (!string.IsNullOrWhiteSpace(idem))
        {
            var existing = await db.Leads.AsNoTracking()
                .FirstOrDefaultAsync(
                    x => x.IdempotencyKey == idem && x.Kind == LeadKind.Contact,
                    ct);
            if (existing is not null)
            {
                return Ok(new LeadCreatedResponse
                {
                    Id = existing.Id,
                    Status = "received",
                    Message = "Đã tiếp nhận yêu cầu trước đó."
                });
            }
        }

        var lead = new Lead
        {
            Id = Guid.NewGuid(),
            Kind = LeadKind.Contact,
            CreatedAt = DateTimeOffset.UtcNow,
            IdempotencyKey = string.IsNullOrWhiteSpace(idem) ? null : idem.Trim(),
            Name = body.Name.Trim(),
            Email = body.Email.Trim(),
            Phone = string.IsNullOrWhiteSpace(body.Phone) ? null : body.Phone.Trim(),
            Locale = string.IsNullOrWhiteSpace(body.Locale) ? "vi" : body.Locale.Trim(),
            Source = string.IsNullOrWhiteSpace(body.Source) ? "contact_page" : body.Source.Trim(),
            Company = string.IsNullOrWhiteSpace(body.Company) ? null : body.Company.Trim(),
            Service = string.IsNullOrWhiteSpace(body.Service) ? null : body.Service.Trim(),
            Message = body.Message.Trim()
        };

        db.Leads.Add(lead);
        try
        {
            await db.SaveChangesAsync(ct);
        }
        catch (DbUpdateException)
        {
            if (!string.IsNullOrWhiteSpace(idem))
            {
                var dup = await db.Leads.AsNoTracking()
                    .FirstOrDefaultAsync(
                        x => x.IdempotencyKey == idem && x.Kind == LeadKind.Contact,
                        ct);
                if (dup is not null)
                    return Ok(new LeadCreatedResponse
                    {
                        Id = dup.Id,
                        Status = "received",
                        Message = "Đã tiếp nhận yêu cầu trước đó."
                    });
            }
            throw;
        }

        return Created($"/api/v1/leads/{lead.Id}", new LeadCreatedResponse
        {
            Id = lead.Id,
            Status = "received",
            Message = "Cảm ơn bạn đã liên hệ."
        });
    }

    /// <summary>Form đăng ký tư vấn (/register).</summary>
    [HttpPost("registration")]
    [ProducesResponseType(typeof(LeadCreatedResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(LeadCreatedResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> CreateRegistration(
        [FromBody] RegistrationLeadRequest body,
        CancellationToken ct)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (!body.ConsentPrivacy)
        {
            ModelState.AddModelError(nameof(body.ConsentPrivacy), "Cần đồng ý chính sách bảo mật.");
            return ValidationProblem(ModelState);
        }

        var idem = Request.Headers["Idempotency-Key"].FirstOrDefault();
        if (!string.IsNullOrWhiteSpace(idem))
        {
            var existing = await db.Leads.AsNoTracking()
                .FirstOrDefaultAsync(
                    x => x.IdempotencyKey == idem && x.Kind == LeadKind.Registration,
                    ct);
            if (existing is not null)
            {
                return Ok(new LeadCreatedResponse
                {
                    Id = existing.Id,
                    Status = "received",
                    Message = "Đã tiếp nhận đăng ký trước đó."
                });
            }
        }

        var lead = new Lead
        {
            Id = Guid.NewGuid(),
            Kind = LeadKind.Registration,
            CreatedAt = DateTimeOffset.UtcNow,
            IdempotencyKey = string.IsNullOrWhiteSpace(idem) ? null : idem.Trim(),
            Name = body.FullName.Trim(),
            Email = body.Email.Trim(),
            Phone = body.Phone.Trim(),
            Locale = string.IsNullOrWhiteSpace(body.Locale) ? "vi" : body.Locale.Trim(),
            Source = string.IsNullOrWhiteSpace(body.Source) ? "register_page" : body.Source.Trim(),
            ProductInterest = body.ProductInterest.Trim(),
            JobTitle = body.JobTitle.Trim(),
            Company = body.Company.Trim(),
            Province = body.Province.Trim(),
            Headcount = body.Headcount.Trim(),
            ConsentPrivacy = body.ConsentPrivacy
        };

        db.Leads.Add(lead);
        try
        {
            await db.SaveChangesAsync(ct);
        }
        catch (DbUpdateException)
        {
            if (!string.IsNullOrWhiteSpace(idem))
            {
                var dup = await db.Leads.AsNoTracking()
                    .FirstOrDefaultAsync(
                        x => x.IdempotencyKey == idem && x.Kind == LeadKind.Registration,
                        ct);
                if (dup is not null)
                    return Ok(new LeadCreatedResponse
                    {
                        Id = dup.Id,
                        Status = "received",
                        Message = "Đã tiếp nhận đăng ký trước đó."
                    });
            }
            throw;
        }

        return Created($"/api/v1/leads/{lead.Id}", new LeadCreatedResponse
        {
            Id = lead.Id,
            Status = "received",
            Message = "Đã ghi nhận thông tin đăng ký."
        });
    }
}
