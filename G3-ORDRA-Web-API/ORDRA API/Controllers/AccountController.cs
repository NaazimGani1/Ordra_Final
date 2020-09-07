using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using ORDRA_API.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Data.Entity;

namespace ORDRA_API.Controllers
{

    public class AccountController : ApiController
    {
        private OrdraDBEntities db = new OrdraDBEntities();


        [HttpPost]
        [Route("api/Account/Register")]
        public async Task<Object> Register(AccountModel model)
        {

            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new Microsoft.AspNet.Identity.UserManager<ApplicationUser>(userStore);

            model.Role = "Cashier";
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };
            try
            {
                var result = await manager.CreateAsync(applicationUser, model.Password);
                if (result.Succeeded)
                {
                    await manager.AddToRoleAsync(applicationUser.Id, model.Role);
                    //Create User in User Table 
                    User newUser = new User();
                    newUser.UserTypeID = 2;
                    newUser.UserPassword = model.Password;
                    newUser.UserName = model.FirstName;
                    newUser.UserSurname = model.LastName;
                    newUser.UserEmail = model.Email;
                    db.Users.Add(newUser);
                    await db.SaveChangesAsync();

                    //find NewUser
                    User newEmployee = await db.Users.Where(x => x.UserName == newUser.UserName && x.UserSurname == newUser.UserSurname).FirstOrDefaultAsync();


                    //Create Employee based on user 
                    Employee newEmp = new Employee();
                    newEmp.UserID = newEmployee.UserID ;
                    db.Employees.Add(newEmp);
                    await db.SaveChangesAsync();

                    //createAppEmployee
                    AppEmployee newAppemp = new AppEmployee();
                    newAppemp.EmpName = newUser.UserName;
                    newAppemp.EmpSurname = newUser.UserSurname;
                    newAppemp.EmpEmail = newUser.UserEmail;
                    db.AppEmployees.Add(newAppemp);
                    await db.SaveChangesAsync();

                }
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }



        [HttpPost]
        [Route("api/Account/Login")]
        public async Task<Object> Login(LoginModel model)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new Microsoft.AspNet.Identity.UserManager<ApplicationUser>(userStore);

            var user = await manager.FindByNameAsync(model.UserName);
            if (user != null && await manager.CheckPasswordAsync(user, model.Password))
            {
                //Get role assigned to the user
                var role = await manager.GetRolesAsync(user.Id);
                IdentityOptions _options = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1234567890123456")), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return new { token };
            }
            else
                return new { message = "Username or password is incorrect." };
        }



        [HttpGet]
        [Route("api/GetUserClaims")]
        public AccountModel GetUserClaims()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            AccountModel model = new AccountModel()
            {
                UserName = identityClaims.FindFirst("Username").Value,
                Email = identityClaims.FindFirst("Email").Value,
                FirstName = identityClaims.FindFirst("FirstName").Value,
                LastName = identityClaims.FindFirst("LastName").Value,
                LoggedOn = identityClaims.FindFirst("LoggedOn").Value
            };
            return model;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("api/ForAdminRole")]
        public string ForAdminRole()
        {
            return "for admin role";
        }

        [HttpGet]
        [Authorize(Roles = "Employee")]
        [Route("api/ForEmployeeRole")]
        public string ForEmployeeRole()
        {
            return "For Employee role";
        }

        [HttpGet]
        [Authorize(Roles = "Employee,Customer")]
        [Route("api/ForEmployeeOrCustomer")]
        public string ForEmployeeOrCustomer()
        {
            return "For employee/customer role";
        }
    }
}
