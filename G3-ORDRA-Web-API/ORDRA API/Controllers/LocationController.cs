using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ORDRA_API.Models;
using System.Data.Entity;

namespace ORDRA_API.Controllers
{
    [RoutePrefix("Api/Location")]
    public class LocationController : ApiController
    {
        //database
        OrdraDBEntities db = new OrdraDBEntities();

        //get all product category details
        [HttpGet]
        [Route("AllLocationDetails")]
        public IQueryable<Location> GetLocation()
        {
            try
            {
                return db.Locations;
            }
            catch (Exception)
            {
                throw;
            }
        }

        //get location by ID

        [HttpGet]
        [Route("GetLocationDetailsById/{LocationId}")]
        public IHttpActionResult GetLocationById(string LocationId)
        {
            Location objectLocation = new Location();
            int ID = Convert.ToInt32(LocationId);

            try
            {
                objectLocation = db.Locations.Find(ID);
                if (objectLocation == null)
                {
                    return NotFound();
                }
            }
            catch (Exception)
            {
                throw;
            }
            return Ok(objectLocation);
        }

        //insert a new location
        [HttpPost]
        [Route("InsertLocationDetails")]
        public IHttpActionResult PostLocation(Location data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                db.Locations.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
            return Ok(data);
        }

        //update a location
        [HttpPut]
        [Route("UpdateLocationDetails")]
        public IHttpActionResult PutLocation(Location Location)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Location objectLocation = new Location();
                objectLocation = db.Locations.Find(Location.LocationID);
                if (objectLocation != null)
                {
                    objectLocation.LocName = Location.LocName;

                }

                int i = this.db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
            return Ok(Location);
        }


    }
}
