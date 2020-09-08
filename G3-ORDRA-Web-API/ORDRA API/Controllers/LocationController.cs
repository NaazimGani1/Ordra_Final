using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ORDRA_API.Models;
using System.Data.Entity;
using System.Dynamic;
using System.Web.Http.Cors;

namespace ORDRA_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    [RoutePrefix("API/Location")]
    public class LocationController : ApiController
    {
        //DATABASE INITIALIZING
        OrdraDBEntities db = new OrdraDBEntities();

        //Getting all Locations
        [HttpGet]
        [Route("getAllLocations")]
        public object getAllLocations()
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();

            try
            {
                toReturn = db.Locations.Include(x => x.Area).Include(x => x.Container).Include(x => x.Location_Status).ToList();
            }
            catch (Exception error)
            {
                toReturn = "Something Went Wrong" + error;
            }

            return toReturn;

        }

        //Get all areas for select
        [HttpGet]
        [Route("GetAllAreas")]
        public object GetAllAreas()
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();
            try
            {
                toReturn = db.Areas.ToList();
            }
            catch (Exception error)
            {
                toReturn = "Something went wrong";
            }
            return toReturn;
        }

        //Get all statusses for select
        [HttpGet]
        [Route("GetAllStatusses")]
        public object GetAllStatusses()
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();
            try
            {
                toReturn = db.Location_Status.ToList();
            }
            catch (Exception error)
            {
                toReturn = "Something went wrong";
            }
            return toReturn;
        }

        //Get all containers for select
        [HttpGet]
        [Route("GetAllContainers")]
        public object GetAllContainers()
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();
            try
            {
                toReturn = db.Containers.ToList();
            }
            catch (Exception error)
            {
                toReturn = "Something went wrong";
            }
            return toReturn;
        }

        //Getting Location by id
        [Route("getLocation/{id}")]
        public object getLocation(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;

            Location location = new Location();
            dynamic toReturn = new ExpandoObject();

            try
            {
                location = db.Locations.Include(x => x.Area).Include(x => x.Container).Include(x => x.Location_Status).Where(x => x.LocationID == id).FirstOrDefault();

                if (location == null)
                {
                    toReturn.Message = "Location Not Found.";
                }
                else
                {

                    toReturn = searchLocation(location.LocName);
                }

            }
            catch (Exception error)
            {
                toReturn = "Something Went Wrong: " + error.Message;
            }

            return toReturn;


        }

        //searching Location by name
        [HttpGet]
        [Route("searchLocation")]
        public object searchLocation(string name)
        {

            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();
            toReturn.location = new ExpandoObject();

            try
            {
                //Search Location in database
                Location location = db.Locations.Where(x => x.LocName == name).FirstOrDefault();

                if (location != null)
                {

                    Area area = db.Areas.Where(x => x.AreaID == location.AreaID).FirstOrDefault();
                    Container container = db.Containers.Where(x => x.ContainerID == location.ContainerID).FirstOrDefault();
                    Location_Status status = db.Location_Status.Where(x => x.LocationStatusID == location.LocationStatusID).FirstOrDefault();

                    dynamic locationDetails = new ExpandoObject();
                    locationDetails.LocName = location.LocName;
                    locationDetails.ArName = area.ArName;
                    locationDetails.ConName = container.ConName;
                    locationDetails.LSDescription = status.LSDescription;
                    toReturn.location = locationDetails;
                }
                else
                {

                    toReturn.Message = "Location Not Found";

                }
            }

            catch (Exception error)
            {
                toReturn = "Something Went Wrong " + error.Message;
            }

            return toReturn.location;
        }


        //add location
        [HttpPost]
        [Route("addLocation")]
        public object addLocation(Location location)
        {

            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();

            ////try
            ////{
            Area area = db.Areas.Where(x => x.AreaID == location.AreaID).FirstOrDefault();
            Container container = db.Containers.Where(x => x.ContainerID == location.ContainerID).FirstOrDefault();
            Location_Status status = db.Location_Status.Where(x => x.LocationStatusID == location.LocationStatusID).FirstOrDefault();

            //Location details for object
            Location locationDetails = new Location();
            if (location != null)
            {
                locationDetails.Area = area;
                locationDetails.Container = container;
                locationDetails.Location_Status = status;
                locationDetails.LocName = location.LocName;

                db.Locations.Add(locationDetails);
                db.SaveChanges();

                toReturn.Message = "Location Succesfully Created";
            }
            else
            {
                toReturn.Message = "Location Not Found";
            }
            ////}
            ////catch (Exception)
            ////{
            ////toReturn.Message = "Oops!";


            ////}

            return toReturn;


        }

        //Update Location
        [HttpPut]
        [Route("updateLocation")]
        public object updateLocation(Location location)
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();
            Location locationDetails = new Location();

            try
            {
                //Set Location Details To Return object
                locationDetails = db.Locations.Include(x => x.Area).Include(x => x.Container).Include(x => x.Location_Status).Where(x => x.LocationID == location.LocationID).FirstOrDefault();
                if (locationDetails != null)
                {
                    locationDetails.LocName = location.LocName;

                    db.SaveChanges();
                    toReturn.Message = "Update Successful";
                }
                else
                {
                    toReturn.Message = "Location Not Found";
                }

            }

            catch (Exception)
            {
                toReturn.Message = "Update not successful.";

            }


            return toReturn;
        }




    }
}
