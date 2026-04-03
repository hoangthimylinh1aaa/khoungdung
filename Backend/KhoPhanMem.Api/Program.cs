using KhoPhanMem.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(o =>
{
    o.SwaggerDoc("v1", new OpenApiInfo { Title = "Kho Phần Mềm API", Version = "v1" });
});

var conn = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("ConnectionStrings:DefaultConnection is required.");
var dbProvider = builder.Configuration["Database:Provider"];
builder.Services.AddDbContext<AppDbContext>(options =>
{
    if (string.Equals(dbProvider, "Sqlite", StringComparison.OrdinalIgnoreCase)
        || conn.Contains("Data Source=", StringComparison.OrdinalIgnoreCase)
        || conn.StartsWith("Filename=", StringComparison.OrdinalIgnoreCase))
        options.UseSqlite(conn);
    else
        options.UseSqlServer(conn);
});

var corsOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? Array.Empty<string>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        if (corsOrigins.Length > 0)
            policy.WithOrigins(corsOrigins);
        else
            policy.AllowAnyOrigin();
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();
// GET /swagger/v1/swagger.json hoạt động; HEAD có thể trả 404 (hành vi Swashbuckle).
var showDocs = !app.Environment.IsProduction()
    || app.Configuration.GetValue("Swagger:Enabled", false);
if (showDocs)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var bootstrapDb = app.Environment.IsDevelopment()
        || app.Configuration.GetValue("Database:EnsureCreated", false);
    if (bootstrapDb)
    {
        Directory.CreateDirectory(Path.Combine(app.Environment.ContentRootPath, "Data"));
        await db.Database.EnsureCreatedAsync();
        await DbSeeder.SeedArticlesAsync(db);
    }
}

app.Run();
