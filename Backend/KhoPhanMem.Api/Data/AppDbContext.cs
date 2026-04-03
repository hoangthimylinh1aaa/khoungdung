using KhoPhanMem.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace KhoPhanMem.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Lead> Leads => Set<Lead>();
    public DbSet<Article> Articles => Set<Article>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Lead>(e =>
        {
            e.ToTable("Leads");
            e.HasKey(x => x.Id);
            e.Property(x => x.Name).HasMaxLength(256).IsRequired();
            e.Property(x => x.Email).HasMaxLength(320).IsRequired();
            e.Property(x => x.Phone).HasMaxLength(50);
            e.Property(x => x.Locale).HasMaxLength(10).IsRequired();
            e.Property(x => x.IdempotencyKey).HasMaxLength(128);
            e.Property(x => x.Source).HasMaxLength(128);
            e.Property(x => x.Company).HasMaxLength(256);
            e.Property(x => x.Service).HasMaxLength(256);
            e.Property(x => x.Message).HasMaxLength(8000);
            e.Property(x => x.ProductInterest).HasMaxLength(256);
            e.Property(x => x.JobTitle).HasMaxLength(256);
            e.Property(x => x.Province).HasMaxLength(128);
            e.Property(x => x.Headcount).HasMaxLength(64);
            e.HasIndex(x => x.IdempotencyKey)
                .IsUnique()
                .HasFilter("[IdempotencyKey] IS NOT NULL");
            e.HasIndex(x => x.CreatedAt);
        });

        modelBuilder.Entity<Article>(e =>
        {
            e.ToTable("Articles");
            e.HasKey(x => x.Id);
            e.Property(x => x.Slug).HasMaxLength(256).IsRequired();
            e.Property(x => x.Badge).HasMaxLength(64).IsRequired();
            e.Property(x => x.Title).HasMaxLength(512).IsRequired();
            e.Property(x => x.Excerpt).HasMaxLength(2000).IsRequired();
            e.Property(x => x.Locale).HasMaxLength(10).IsRequired();
            e.HasIndex(x => new { x.Slug, x.Locale }).IsUnique();
            e.HasIndex(x => x.PublishedAt);
        });
    }
}
