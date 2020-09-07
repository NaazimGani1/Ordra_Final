using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using ORDRA_API.Models;

namespace ORDRA_API.Controllers
{
    public class SearchController : ApiController
    {
        private OrdraDBEntities db = new OrdraDBEntities();


        [HttpPost]
        [Route("api/Search/searchEmployee")]
        public async Task<Object> searchEmployee(searchEmployee Emp)
        {
            AppEmployee appEmployee = await db.AppEmployees.Where(x => x.EmpName == Emp.EmployeeName && x.EmpSurname == Emp.EmployeeSurname).FirstOrDefaultAsync();
            if (appEmployee == null)
            {
                var message = "NotFound";
                return message;
            }

                return Ok(appEmployee);
        }


        [HttpPost]
        [Route("api/Search/searchArea")]
        public async Task<Object> searchArea(searchArea Arr)
        {
            Area appArea = await db.Areas.Where(x => x.ArName == Arr.ArName  && x.AreaStatusID == Arr.AreaStatusID).FirstOrDefaultAsync();
            if (appArea == null)
            {
                var message = "NotFound";
                return message;
            }

            return Ok(appArea);
        }


    }
}
