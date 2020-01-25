using DataLayer.Entities;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Reflection;
using System.Text;

namespace DataLayer
{
    public class EfIDbContext : IdentityDbContext
    {
        public EfIDbContext(DbContextOptions<EfIDbContext> options) : base(options)
        {

        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    }

    public class EfDbContextFactory : IDesignTimeDbContextFactory<EfIDbContext>
    {
        public EfIDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<EfIDbContext>();
            
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=TravelDb;Username=postgres;Password=Andrew0011", b => b.MigrationsAssembly("DataLayer"));
            return new EfIDbContext(optionsBuilder.Options);
        }
    }
}
