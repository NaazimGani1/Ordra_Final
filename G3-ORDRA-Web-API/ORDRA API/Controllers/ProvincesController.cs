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
using System.Dynamic;
using System.Web.Http.Cors;
using ORDRA_API.Models;

namespace ORDRA_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/Province")]
    public class ProvincesController : ApiController
    {
        //DATABASE INITIALIZING
        OrdraDBEntities db = new OrdraDBEntities();


        //Getting all Provinces
        [HttpGet]
        [Route("getAllProvinces")]
        public object getAllProvinces()
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();

            try
            {
                toReturn = db.Provinces.ToList();
            }
            catch (Exception error)
            {
                toReturn = "Something Went Wrong" + error;
            }

            return toReturn;

        }

        //Getting Province by id
        [HttpGet]
        [Route("getProvince/{id}")]

        public object getProvince(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;

            Province objectProvince = new Province();
            dynamic toReturn = new ExpandoObject();

            try
            {
                objectProvince = db.Provinces.Find(id);

                if (objectProvince == null)
                {
                    toReturn.Message = "Record Not Found";
                }
                else
                {

                    toReturn = objectProvince;
                }

            }
            catch (Exception error)
            {
                toReturn = "Something Went Wrong: " + error.Message;
            }

            return toReturn;


        }

        //searching Province by name 
        [HttpGet]
        [Route("searchProvince")]
        public object searchProvince(string name)
        {

            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();

            try
            {
                //Search Province in database
                var Province = db.Provinces.Where(x => x.ProvName == name).FirstOrDefault();

                if (Province != null)
                {

                    toReturn = Province;
                }
                else
                {

                    toReturn.Message = "Record Not Found";

                }
            }

            catch (Exception error)
            {
                toReturn = "Something Went Wrong " + error.Message;
            }

            return toReturn;


        }

        //adding a new province
        [HttpPost]
        [Route("addProvince")]
        public object addProvince(Province newProvince)
        {

            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();

            try
            {
                var name = newProvince.ProvName;
                List<Province> provList = db.Provinces.ToList();
                var dupCheck = false;
                var specCheck = false;

                foreach (var item in provList)
                {
                    if (name == item.ProvName)
                    {
                        dupCheck = true;
                    }
                }

                if (dupCheck == true)
                {
                    db.Provinces.Add(newProvince);
                    db.SaveChanges();
                    toReturn.Message = "Add Successful";
                }
                else if (dupCheck == false)
                {

                    string specialChar = @"\|!#$%&/()=?»«@£§€{}.-;'<>_,";
                    foreach (var item in specialChar)
                    {
                        if (name.Contains(item))
                        {
                            specCheck = true;
                        }
                    }

                    if (name.Equals(null) || specCheck == true || name.Equals(""))
                    {
                        toReturn.Message = "Invalid input";
                    }
                    else
                    {
                        db.Provinces.Add(newProvince);
                        db.SaveChanges();
                        toReturn.Message = "Add Successful";
                    }

                }



            }
            catch (Exception)
            {
                db.Provinces.Add(newProvince);
                db.SaveChanges();
                toReturn.Message = "Add Successful";


            }

            return toReturn;


        }

        //Update province
        [HttpPut]
        [Route("updateProvince")]
        public object updateProvince(Province provinceUpdate)
        {
            db.Configuration.ProxyCreationEnabled = false;

            Province objectProvince = new Province();
            dynamic toReturn = new ExpandoObject();
            var id = provinceUpdate.ProvinceID;

            try
            {
                objectProvince = db.Provinces.Where(x => x.ProvinceID == id).FirstOrDefault();
                var Province = db.Provinces.Where(x => x.ProvName == provinceUpdate.ProvName).FirstOrDefault();

                if (objectProvince != null)
                {
                    if (Province == null)
                    {
                        objectProvince.ProvName = provinceUpdate.ProvName;
                    }
                    else
                    {
                        toReturn.Message = "Duplicate record";
                    }



                    db.SaveChanges();

                    toReturn.Message = "Update Successful";
                }
                else
                {
                    toReturn.Message = "Record Not Found";
                }
            }

            catch (Exception)
            {
                toReturn.Message = "Update Unsuccessful";

            }


            return toReturn;
        }

        //Deleting a province 
        [HttpDelete]
        [Route("removeProvince")]
        public object removeProvince(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;

            Province objectProvince = new Province();
            dynamic toReturn = new ExpandoObject();

            try
            {
                objectProvince = db.Provinces.Find(id);

                if (objectProvince == null)
                {
                    toReturn.Message = "Record Not Found";
                }
                else
                {
                    db.Provinces.Remove(objectProvince);
                    db.SaveChanges();
                    toReturn.Message = "Delete Successful";
                }

            }
            catch (Exception error)
            {
                toReturn = "Something Went Wrong " + error.Message;
            }

            return toReturn;
        }


        /*private OrdraDBEntities db = new OrdraDBEntities();

        // GET: api/Provinces
        public IQueryable<Province> GetProvinces()
        {
            return db.Provinces;
        }

        // GET: api/Provinces/5
        [ResponseType(typeof(Province))]
        public async Task<IHttpActionResult> GetProvince(int id)
        {
            Province province = await db.Provinces.FindAsync(id);
            if (province == null)
            {
                return NotFound();
            }

            return Ok(province);
        }

        // PUT: api/Provinces/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProvince(int id, Province province)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != province.ProvinceID)
            {
                return BadRequest();
            }

            db.Entry(province).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProvinceExists(id))
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

        // POST: api/Provinces
        [ResponseType(typeof(Province))]
        public async Task<IHttpActionResult> PostProvince(Province province)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Provinces.Add(province);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = province.ProvinceID }, province);
        }

        // DELETE: api/Provinces/5
        [ResponseType(typeof(Province))]
        public async Task<IHttpActionResult> DeleteProvince(int id)
        {
            Province province = await db.Provinces.FindAsync(id);
            if (province == null)
            {
                return NotFound();
            }

            db.Provinces.Remove(province);
            await db.SaveChangesAsync();

            return Ok(province);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProvinceExists(int id)
        {
            return db.Provinces.Count(e => e.ProvinceID == id) > 0;
        }*/
    }
}