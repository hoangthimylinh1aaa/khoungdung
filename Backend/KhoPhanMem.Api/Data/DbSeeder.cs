using KhoPhanMem.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace KhoPhanMem.Api.Data;

public static class DbSeeder
{
    public static async Task SeedArticlesAsync(AppDbContext db, CancellationToken ct = default)
    {
        if (await db.Articles.AnyAsync(ct))
            return;

        var articles = new[]
        {
            new Article
            {
                Id = Guid.NewGuid(),
                Slug = "kd-commerce-3-launch",
                Badge = "new",
                Title = "KD Commerce 3.0 — Nâng cấp toàn diện",
                Excerpt =
                    "Phiên bản mới nhất của KD Commerce mang đến giao diện mới, hiệu suất vượt trội và tích hợp AI thông minh hơn.",
                PublishedAt = new DateTime(2026, 3, 1, 0, 0, 0, DateTimeKind.Utc),
                Locale = "vi"
            },
            new Article
            {
                Id = Guid.NewGuid(),
                Slug = "digital-transformation-2026",
                Badge = "event",
                Title = "Hội thảo Chuyển đổi số 2026",
                Excerpt =
                    "Kho phần mềm đồng hành cùng hơn 200 doanh nghiệp tại Hội thảo Chuyển đổi số TP. Hồ Chí Minh.",
                PublishedAt = new DateTime(2026, 2, 20, 0, 0, 0, DateTimeKind.Utc),
                Locale = "vi"
            },
            new Article
            {
                Id = Guid.NewGuid(),
                Slug = "kd-hrm-face-attendance",
                Badge = "update",
                Title = "KD HRM tích hợp chấm công khuôn mặt",
                Excerpt =
                    "Tính năng nhận diện khuôn mặt mới giúp quản lý chấm công chính xác và tiện lợi hơn bao giờ hết.",
                PublishedAt = new DateTime(2026, 2, 15, 0, 0, 0, DateTimeKind.Utc),
                Locale = "vi"
            },
            new Article
            {
                Id = Guid.NewGuid(),
                Slug = "kd-chain-25",
                Badge = "new",
                Title = "Ra mắt KD Chain phiên bản 2.5",
                Excerpt =
                    "Quản lý chuỗi cửa hàng hiệu quả hơn với dashboard tập trung và báo cáo real-time mới.",
                PublishedAt = new DateTime(2026, 2, 5, 0, 0, 0, DateTimeKind.Utc),
                Locale = "vi"
            },
            new Article
            {
                Id = Guid.NewGuid(),
                Slug = "top-10-startup-vn",
                Badge = "event",
                Title = "Kho phần mềm đạt Top 10 Startup Việt Nam",
                Excerpt =
                    "Được vinh danh trong danh sách Top 10 Startup công nghệ xuất sắc nhất Việt Nam năm 2025.",
                PublishedAt = new DateTime(2026, 1, 25, 0, 0, 0, DateTimeKind.Utc),
                Locale = "vi"
            },
            new Article
            {
                Id = Guid.NewGuid(),
                Slug = "security-perf-q1-2026",
                Badge = "update",
                Title = "Cập nhật bảo mật và hiệu năng Q1/2026",
                Excerpt =
                    "Các cải tiến bảo mật quan trọng và tối ưu hóa hiệu năng cho toàn bộ hệ sinh thái Kho phần mềm.",
                PublishedAt = new DateTime(2026, 1, 10, 0, 0, 0, DateTimeKind.Utc),
                Locale = "vi"
            }
        };

        db.Articles.AddRange(articles);
        await db.SaveChangesAsync(ct);
    }
}
