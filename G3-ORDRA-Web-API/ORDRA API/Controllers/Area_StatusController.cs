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
    public class Area_StatusController : ApiController
    {
        private OrdraDBEntities db = new OrdraDBEntities();

        // GET: api/Area_Status
        public IQueryable<Area_Status> GetArea_Status()
        {
            return db.Area_Status;
        }

        // GET: api/Area_Status/5
        [ResponseType(typeof(Area_Status))]
        public async Task<IHttpActionResult> GetArea_Status(int id)
        {
            Area_Status area_Status = await db.Area_Status.FindAsync(id);
            if (area_Status == null)
            {
                return NotFound();
            }

            return Ok(area_Status);
        }

        // PUT: api/Area_Status/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutArea_Status(int id, Area_Status area_Status)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != area_Status.AreaStatusID)
            {
                return BadRequest();
            }

            db.Entry(area_Status).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Area_StatusExists(id))
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

        // POST: api/Area_Status
        [ResponseType(typeof(Area_Status))]
        public async Task<IHttpActionResult> PostArea_Status(Area_Status area_Status)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Area_Status.Add(area_Status);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = area_Status.AreaStatusID }, area_Status);
        }

        // DELETE: api/Area_Status/5
        [ResponseType(typeof(Area_Status))]
        public async Task<IHttpActionResult> DeleteArea_Status(int id)
        {
            Area_Status area_Status = await db.Area_Status.FindAsync(id);
            if (area_Status == null)
            {
                return NotFound();
            }

            db.Area_Status.Remove(area_Status);
            await db.SaveChangesAsync();

            return Ok(area_Status);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Area_StatusExists(int id)
        {
            return db.Area_Status.Count(e => e.AreaStatusID == id) > 0;
        }
    }
}