using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using ORDRA_API.Providers;
using ORDRA_API.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

[assembly: OwinStartup(typeof(ORDRA_API.Startup))]

namespace ORDRA_API
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);
            createRolesandUsers();
            OAuthAuthorizationServerOptions option = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/token"),
                Provider = new ApplicationOAuthProvider(),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(60),
                AllowInsecureHttp = true
            };
            app.UseOAuthAuthorizationServer(option);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        }

        private void createRolesandUsers()
        {
            ApplicationDbContext context = new ApplicationDbContext();

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));

            try
            {
                if (!roleManager.RoleExists("Admin"))
                {

                    var role = new IdentityRole();
                    role.Name = "Admin";
                    roleManager.Create(role);


                    var user = new ApplicationUser();
                    user.UserName = "OrdraAdmin";
                    user.FirstName = "Ordra";
                    user.LastName= "System";
                    user.Email = "ordra@gmail.com";

                    string userPWD = "Ordra1234!";

                    var chkUser = UserManager.Create(user, userPWD);
                    if (chkUser.Succeeded)
                    {
                        var result1 = UserManager.AddToRole(user.Id, "Admin");
                    }
                }
                if (!roleManager.RoleExists("Manager"))
                {
                    var role = new IdentityRole();
                    role.Name = "Manager";
                    roleManager.Create(role);

                }
                if (!roleManager.RoleExists("Cashier"))
                {
                    var role = new IdentityRole();
                    role.Name = "Cashier";
                    roleManager.Create(role);

                }

            }
            catch (Exception)
            {
            }
        }
    }
}