using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Dynamic;
using System.Data.Entity;
using System.Web.Http.Cors;
using ORDRA_API.Models;

namespace ORDRA_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    [RoutePrefix("API/Sale")]
    public class SaleController : ApiController
    {
        //DATABASE INITIALIZING
        OrdraDBEntities db = new OrdraDBEntities();

        //Make Sale
        [HttpPost]
        [Route("initiateMakeSale")]
        public object initiateMakeSale()
        {
           db.Configuration.ProxyCreationEnabled = false;
           dynamic toReturn = new ExpandoObject();
            try
            {

            }
            catch (Exception error)
            {
                toReturn = error.Message;
            }

            return toReturn;


        }
    //Make Sale
        [HttpPost]
        [Route("makeSale")]
        public object makeSale()
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();
            try
            {

            }
            catch (Exception error)
            {
                toReturn = error.Message;
            }

            return toReturn;
        }


    }
}
