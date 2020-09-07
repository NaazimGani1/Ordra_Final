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
    [RoutePrefix("Api/ProductCategory")]
    public class ProductCategoryController : ApiController
    {
        //database
        OrdraDBEntities db = new OrdraDBEntities();

        //get all product category details
        [HttpGet]
        [Route("AllProductCategoryDetails")]
        public IQueryable<Product_Category> GetProductCategory()
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.Product_Category;
            }        
            catch(Exception)
            {
                throw;
            }
        }

        //get product category by ID
        [HttpGet]
        [Route("GetProductCategoryDetailsById/{productCategoryId}")]
        public IHttpActionResult GetProductCategoryById(string productCategoryId)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Product_Category objectProductCategory = new Product_Category();
            int ID = Convert.ToInt32(productCategoryId);

            try
            {
                objectProductCategory = db.Product_Category.Find(ID);
                if (objectProductCategory == null)
                {
                    return NotFound();
                }
            }
            catch (Exception)
            {
                throw;
            }
            return Ok(objectProductCategory);
        }

        //insert a new product category
        [HttpPost]
        [Route("InsertProductCategoryDetails")]
        public IHttpActionResult PostProductCategory(Product_Category data)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                db.Product_Category.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
            return Ok(data);
        }

        //update a product category
        [HttpPut]
        [Route("UpdateProductCategoryDetails")]
        public IHttpActionResult PutProductCategory(Product_Category product_Category)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Product_Category objectProductCategory = new Product_Category();
                objectProductCategory = db.Product_Category.Find(product_Category.ProductCategoryID);
                if (objectProductCategory != null)
                {
                    objectProductCategory.PCatName = product_Category.PCatName;
                    objectProductCategory.PCatDescription = product_Category.PCatDescription;

                }

                int i = this.db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
            return Ok(product_Category);
        }

        //delete a product category
        [HttpDelete]
        [Route("DeleteProductCategoryDetails")]
        public IHttpActionResult DeleteProductCategoryDetails(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Product_Category productCategory = db.Product_Category.Find(id);
            if (productCategory == null)
            {
                return NotFound();
            }

            db.Product_Category.Remove(productCategory);
            db.SaveChanges();
            return Ok(productCategory);
        }
    }
}
