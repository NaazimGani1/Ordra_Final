using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ORDRA_API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {

        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //AspNetUsers -> User
            modelBuilder.Entity<ApplicationUser>()
                .ToTable("AppUser");
            //AspNetRoles -> Role
            modelBuilder.Entity<IdentityRole>()
                .ToTable("AppRole");
            //AspNetUserRoles -> UserRole
            modelBuilder.Entity<IdentityUserRole>()
                .ToTable("AppUserRole");
            //AspNetUserClaims -> UserClaim
            modelBuilder.Entity<IdentityUserClaim>()
                .ToTable("AppUserClaim");
            //AspNetUserLogins -> UserLogin
            modelBuilder.Entity<IdentityUserLogin>()
                .ToTable("AppUserLogin");
        }
    }
}