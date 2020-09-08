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
    [RoutePrefix("API/SupplierOrder")]
    public class SupplierOrderController : ApiController
    {
        //DATABASE INITIALIZING
        OrdraDBEntities db = new OrdraDBEntities();

        //Get all products
        [HttpGet]
        [Route("getProducts")]
        public object getProducts()
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();
            try
            {
                List<Product_Backlog> bl = db.Product_Backlog.Include(x => x.Product).ToList();


                if (bl != null)

                {
                    //Get List Of products with current price
                    List<Product_Backlog> backlogList = db.Product_Backlog.ToList();
                    List<dynamic> backlogs = new List<dynamic>();
                    foreach (var backl in backlogList)
                    {
                        dynamic backlogDetails = new ExpandoObject();
                        backlogDetails.ProductID = backl.ProductID;
                        backlogDetails.QauntityToOrder = backl.QauntityToOrder;

                        backlogs.Add(backlogDetails);
                    }
                    //Get List Of products with current price
                    List<Product> productsList = db.Products.ToList();
                    List<dynamic> products = new List<dynamic>();
                    foreach (var prod in productsList)
                    {
                        dynamic productDetails = new ExpandoObject();
                        productDetails.ProductID = prod.ProductID;
                        productDetails.ProdName = prod.ProdName;

                        products.Add(productDetails);
                    }

                    List<dynamic> productBacklog = new List<dynamic>();
                    foreach (var item in backlogList)
                    {
                        dynamic prod_back = new ExpandoObject();

                        //get product related to ID in backlogs
                        Product Prod = db.Products.Where(x => x.ProductID == item.ProductID).FirstOrDefault();

                        //set the details for my new object 
                        prod_back.ProductID = item.ProductID;
                        prod_back.ProdName = Prod.ProdName;
                        prod_back.QauntityToOrder = item.QauntityToOrder;

                        productBacklog.Add(prod_back);

                        toReturn = productBacklog;

                    }
                    List<Product> product = db.Products.Include(x => x.Suppliers).ToList();

                    productBacklog.Add(product);
                    toReturn = productBacklog;
                }



                else
                {
                    toReturn.Message = "Order(s) Not Found";
                }
            }

            catch (Exception error)
            {
                toReturn = "Something Went Wrong" + error.Message;
            }

            return toReturn;
        }

        [HttpGet]
        [Route("getSuppliers")]
        public object getSuppliers(string name)
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();
            toReturn.product = new ExpandoObject();
            toReturn.supplier = new ExpandoObject();
            //toReturn.supplier = new List<Supplier>();


            try
            {


                Product prod = db.Products.Where(x => x.ProdName == name).FirstOrDefault();

                if (prod != null)
                {


                    List<Supplier> supplier = db.Suppliers.Include(x => x.Products).ToList();

                    if (prod != null)
                    {
                        //Set Product Details To Return Object
                        dynamic productDetails = new ExpandoObject();
                        productDetails.ProdName = prod.ProdName;
                        toReturn.product = productDetails;

                        //Set Product Suppliers
                        List<Supplier> productSuppliers = prod.Suppliers.ToList();
                        List<dynamic> suppliers = new List<dynamic>();
                        foreach (var sup in productSuppliers)
                        {
                            dynamic supp = new ExpandoObject();
                            supp.SupName = sup.SupName;
                            supp.SupCell = sup.SupCell;
                            supp.SupEmail = sup.SupEmail;
                            supp.SupStreet = sup.SupStreet;
                            supp.SupStreetNr = sup.SupStreetNr;
                            supp.SupCode = sup.SupCode;
                            supp.SupSubrub = sup.SupSuburb;
                            suppliers.Add(supp);

                        }
                        toReturn.supplier = suppliers;


                    }
                    else
                    {
                        toReturn.Message = "Supplier Not Found";
                    }

                }
                else
                {
                    toReturn.Message = "Record Not Found";
                }


            }
            catch (Exception error)
            {
                toReturn.Message = "Something Went Wrong" + error.Message;
            }

            return toReturn;
        }

        [HttpGet]
        [Route("getSupplierOrders")]
        public object getSupplierOrders(string name)
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();
            toReturn.product = new ExpandoObject();
            toReturn.supplierorder = new ExpandoObject();
            toReturn.supplier = new ExpandoObject();
            //toReturn.supplier = new List<Supplier>();


            try
            {


                Product prod = db.Products.Where(x => x.ProdName == name).FirstOrDefault();

                if (prod != null)
                {

                    Supplier_Order_Product product = db.Supplier_Order_Product.Include(x => x.Supplier_Order).Where(x => x.ProductID == prod.ProductID).FirstOrDefault();
                    List<Supplier_Order> supplierorder = db.Supplier_Order.Include(x => x.Supplier_Order_Product).Include(x => x.Supplier_Order_Status).Include(x => x.Supplier).ToList();

                    if (prod != null)
                    {
                        //Set Product Details To Return Object
                        dynamic productDetails = new ExpandoObject();
                        productDetails.ProdName = prod.ProdName;
                        toReturn.product = productDetails;

                        List<dynamic> suppliers = new List<dynamic>();
                        foreach (var sup in supplierorder)
                        {
                            dynamic supplierDetails = new ExpandoObject();
                            supplierDetails.SupName = sup.Supplier.SupName;
                            suppliers.Add(supplierDetails);

                        }
                        toReturn.supplier = suppliers;

                        //Set Product Suppliers
                        List<Supplier_Order_Product> supplierOrder = prod.Supplier_Order_Product.ToList();
                        List<dynamic> prods = new List<dynamic>();
                        foreach (var sup in supplierOrder)
                        {
                            dynamic supp = new ExpandoObject();
                            supp.SOPQuantity = sup.SOPQuantity;
                            prods.Add(supp);

                        }
                        toReturn.supplierorder = prods;


                    }
                    else
                    {
                        toReturn.Message = "Supplier Not Found";
                    }

                }
                else
                {
                    toReturn.Message = "Record Not Found";
                }


            }
            catch (Exception error)
            {
                toReturn.Message = "Something Went Wrong" + error.Message;
            }

            return toReturn;
        }

        [HttpPost]
        [Route("placeSupplierOrder")]
        public object placeSupplierOrder(Supplier_Order order)
        {

            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();
            toReturn.newOrder = new ExpandoObject();

            try
            {

                Supplier_Order_Product product = order.Supplier_Order_Product.FirstOrDefault();

                if (order != null && product != null)
                {
                    Supplier supplier = db.Suppliers.Where(x => x.SupplierID == order.SupplierID).FirstOrDefault();
                    Supplier_Order_Status order_Status = db.Supplier_Order_Status.Where(x => x.SOSDescription == "Placed").FirstOrDefault();

                    //save customer order details
                    Supplier_Order supplierOrder = new Supplier_Order();
                    supplierOrder.Supplier = supplier;
                    supplierOrder.Supplier_Order_Status = order_Status;
                    supplierOrder.SODate = order.SODate;
                    //customerOrder.Product_Order_Line = 

                    ;

                    db.Supplier_Order.Add(supplierOrder);
                    db.SaveChanges();

                    //Get The Saved Order details form the db
                    Supplier_Order placedOrder = db.Supplier_Order.ToList().LastOrDefault();

                    if (placedOrder != null)
                    {
                        //Add the Product_Order_Line Records for each product

                        Product prod = db.Products.Where(x => x.ProductID == product.ProductID).FirstOrDefault();
                        Supplier_Order_Product orderProd = new Supplier_Order_Product();
                        orderProd.Supplier_Order = placedOrder;
                        orderProd.Product = prod;
                        orderProd.SOPQuantity = product.SOPQuantity;

                        db.Supplier_Order_Product.Add(orderProd);
                        db.SaveChanges();

                    }
                }
                else
                {
                    toReturn.Message = "Supplier Order Not Found";
                }
            }
            catch (Exception)
            {
                toReturn.Message = "Add unsuccessful";


            }

            return toReturn;
        }

        //Search Order By Cell
        [HttpGet]
        [Route("searchOrder/{orderStat}")]
        public object searchOrder(string orderStat)
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();
            toReturn.orderProduct = new ExpandoObject();
            toReturn.supplierDetails = new ExpandoObject();
            toReturn.orderDetails = new List<dynamic>();


            try
            {
                //Get Customer Order Details From Db
                Supplier_Order_Product orderprod = db.Supplier_Order_Product.Include(x => x.Supplier_Order).Include(x => x.Product).Where(x => x.Supplier_Order.Supplier_Order_Status.SOSDescription == orderStat).FirstOrDefault();


                if (orderprod != null)
                {
                    //Get List Of Products In Customer Order From Db
                    List<Supplier_Order> suporders = db.Supplier_Order.Include(x => x.Supplier_Order_Product).Include(x => x.Supplier).Where(x => x.Supplier_Order_Status.SOSDescription == orderStat).ToList();


                    List<dynamic> orders = new List<dynamic>();
                    foreach (var ord in suporders)
                    {

                        //Create Object And Populate With Product Related Details
                        dynamic orderDetails = new ExpandoObject();
                        orderDetails.ProdName = orderprod.Product.ProdName;
                        orderDetails.SupName = ord.Supplier.SupName;
                        orderDetails.SOPQuantity = orderprod.SOPQuantity;
                        orderDetails.Quantity = ord.SODate;
                        //orderDetails.Status = ord.Supplier_Order_Status.SOSDescription;

                        orders.Add(orderDetails);



                    }
                    toReturn.orderProduct = orderprod;
                    toReturn.orderDetails = suporders;
                }
                else
                {
                    toReturn.Message = "Order(s) Not Found";
                }




            }

            catch (Exception error)
            {
                toReturn.Message = "Something Went Wrong: " + error.Message;
            }


            return toReturn;


        }

    }
}
