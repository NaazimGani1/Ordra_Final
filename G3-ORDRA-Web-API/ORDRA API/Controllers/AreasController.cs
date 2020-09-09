using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using ORDRA_API.Models;

namespace ORDRA_API.Controllers
{
    public class AreasController : ApiController
    {
        private OrdraDBEntities db = new OrdraDBEntities();

        // GET: api/Areas
        public IQueryable<Area> GetAreas()
        {
            return db.Areas;
        }

        // GET: api/Areas/5
        [ResponseType(typeof(Area))]
        public async Task<IHttpActionResult> GetArea(int id)
        {
            Area area = await db.Areas.FindAsync(id);
            if (area == null)
            {
                return NotFound();
            }

            return Ok(area);
        }

        // PUT: api/Areas/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutArea(int id, Area area)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != area.AreaID)
            {
                return BadRequest();
            }

            db.Entry(area).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AreaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Areas
        [ResponseType(typeof(Area))]
        public async Task<object> PostArea(Area area)
        {
            var message = "nothing";
            if (!ModelState.IsValid)
            {
                message = "Error";
                return message;
            }
            //find app employee 
            Area areaf = await db.Areas.Where(x => x.ArName == area.ArName && x.AreaStatusID == area.AreaStatusID).FirstOrDefaultAsync();

            //check for id
            if (areaf != null)
            {
                //fill in missing app employee
                db.Entry(area).State = EntityState.Modified;
                await db.SaveChangesAsync();
                message = "Updated Records";
            }
            else
            {
                //createAppEmployee
                Area newArea = new Area();
                newArea.ArName = area.ArName;
                newArea.ArPostalCode = area.ArPostalCode;
                newArea.AreaStatusID = area.AreaStatusID;
                newArea.Province = area.Province;
                await db.SaveChangesAsync();
                message = "Created Records";

            }
           return message;
        }


        // DELETE: api/Areas/5
        [ResponseType(typeof(Area))]
        public async Task<IHttpActionResult> DeleteArea(int id)
        {
            Area area = await db.Areas.FindAsync(id);
            if (area == null)
            {
                return NotFound();
            }

            db.Areas.Remove(area);
            await db.SaveChangesAsync();

            return Ok(area);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AreaExists(int id)
        {
            return db.Areas.Count(e => e.AreaID == id) > 0;
        }
    }
}