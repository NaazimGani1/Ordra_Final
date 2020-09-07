using ORDRA_API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ORDRA_API.Controllers
{
    public class DeleteController : ApiController
    {
        private OrdraDBEntities db = new OrdraDBEntities();

        [HttpPost]
        [Route("api/Delete/deleteEmployee")]
        public async Task<Object> deleteEmployee(searchEmployee Emp)
        {

            var message = "NotFound";
            AppEmployee appEmployee = await db.AppEmployees.Where(x => x.EmpName == Emp.EmployeeName && x.EmpSurname == Emp.EmployeeSurname).FirstOrDefaultAsync();

            User appEmployeeUser = await db.Users.Where(x => x.UserName == Emp.EmployeeName && x.UserSurname == Emp.EmployeeSurname).FirstOrDefaultAsync();

            Employee appEmployeeEmploee = await db.Employees.Where(x => x.EmpStartDate == appEmployee.EmpStartDate).FirstOrDefaultAsync();

            if (appEmployee == null)
            {
                return message;
            }
            else
            {

                db.Users.Remove(appEmployeeUser);
                await db.SaveChangesAsync();

                db.Employees.Remove(appEmployeeEmploee);
                await db.SaveChangesAsync();

                db.AppEmployees.Remove(appEmployee);
                await db.SaveChangesAsync();

                message = "Success";
            }
            return message;
        }
    }
}
