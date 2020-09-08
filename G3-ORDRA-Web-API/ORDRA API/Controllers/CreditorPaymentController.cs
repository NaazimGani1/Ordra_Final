using ORDRA_API.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Data.Entity;

namespace ORDRA_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    [RoutePrefix("API/CreditorPayment")]
    public class CreditorPaymentController : ApiController
    {
        //DATABASE INITIALIZING
        OrdraDBEntities db = new OrdraDBEntities();

        //Getting all Payments
        [HttpGet]
        [Route("getAllCreditorPayments")]
        public object getAllCreditorPayments()
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();

            try
            {
                toReturn = db.Creditor_Payment.Include(x => x.Creditor).ToList();
            }
            catch (Exception error)
            {
                toReturn = "Something Went Wrong" + error;
            }

            return toReturn;

        }

        //Get all creditors
        [HttpGet]
        [Route("GetAllCreditors")]
        public object GetAllCreditors()
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();
            try
            {
                List<Creditor> cred = db.Creditors.Include(x => x.Supplier).Include(x => x.Creditor_Payment).ToList();
                List<dynamic> creditors = new List<dynamic>();
                foreach (var cre in cred)
                {
                    dynamic creditor = new ExpandoObject();
                    creditor.SupName = cre.Supplier.SupName;
                    creditors.Add(creditor);

                }
                toReturn.creditor = creditors;
            }
            catch (Exception error)
            {
                toReturn = "Something went wrong" + error;
            }
            return toReturn;
        }

        //Getting Payment by id
        [HttpGet]
        [Route("getCreditorPayment/{id}")]

        public object getCreditorPayment(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;

            Creditor_Payment payment = new Creditor_Payment();
            dynamic toReturn = new ExpandoObject();

            try
            {
                payment = db.Creditor_Payment.Include(x => x.Creditor).Include(x => x.Creditor.Supplier).Where(x => x.PaymentID == id).FirstOrDefault();

                if (payment == null)
                {
                    toReturn.Message = "Record Not Found";
                }
                else
                {

                    toReturn = searchCreditorPayment();
                }

            }
            catch (Exception error)
            {
                toReturn = "Something Went Wrong: " + error.Message;
            }

            return toReturn;
        }

        //searching Payment by creditor name
        [HttpGet]
        [Route("searchCreditorPayment")]
        public object searchCreditorPayment()
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();
            toReturn.payment = new List<Creditor_Payment>();

            try
            {
                //Get Payments in database
                List<Creditor_Payment> payment = db.Creditor_Payment.Include(x => x.Creditor).Include(x => x.Creditor.Supplier).ToList();

                if (payment != null)
                {

                    List<dynamic> payments = new List<dynamic>();
                    foreach (var pay in payment)
                    {
                        dynamic paymentDetails = new ExpandoObject();
                        paymentDetails.PaymentID = pay.PaymentID;
                        paymentDetails.SupName = pay.Creditor.Supplier.SupName;
                        paymentDetails.CredPaymentDate = pay.CredPaymentDate;
                        paymentDetails.CredPaymentAmount = pay.CredPaymentAmount;
                        payments.Add(paymentDetails);

                    }
                    toReturn.payment = payments;
                }
                else
                {

                    toReturn.Message = "Payment Not Found";

                }
            }
            catch (Exception error)
            {
                toReturn = "Something Went Wrong" + error;
            }

            return toReturn;

        }

        [HttpPost]
        [Route("addCreditorPayment")]
        public object addCreditorPayment(Creditor_Payment payment)
        {

            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();

            try
            {
                Creditor creditor = db.Creditors.Where(x => x.CreditorID == payment.CreditorID).FirstOrDefault();

                //Set Creditor Payment Details To Return object
                Creditor_Payment paymentDetails = new Creditor_Payment();
                if (payment != null)
                {
                    paymentDetails.Creditor = creditor;
                    paymentDetails.CredPaymentAmount = payment.CredPaymentAmount;
                    paymentDetails.CredPaymentDate = payment.CredPaymentDate;

                    db.Creditor_Payment.Add(paymentDetails);
                    db.SaveChanges();

                    toReturn.Message = "Payment Added Successfully";
                }
                else
                {
                    toReturn.Message = "Payment Not Found";
                }
            }
            catch (Exception)
            {
                toReturn.Message = "Add unsuccessful";


            }

            return toReturn;
        }

        //Update Payment
        [HttpPut]
        [Route("updateCreditorPayment")]
        public object updateCreditorPayment(Creditor_Payment payment)
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic toReturn = new ExpandoObject();
            Creditor_Payment paymentDetails = new Creditor_Payment();

            try
            {
                //Set Location Details To Return object
                paymentDetails = db.Creditor_Payment.Include(x => x.Creditor).Include(x => x.Creditor.Supplier).Where(x => x.PaymentID == payment.PaymentID).FirstOrDefault();
                if (paymentDetails != null)
                {
                    paymentDetails.CredPaymentAmount = payment.CredPaymentAmount;
                    paymentDetails.CredPaymentDate = payment.CredPaymentDate;
                    db.SaveChanges();
                    toReturn.Message = "Update Successful";
                }
                else
                {
                    toReturn.Message = "Payment Not Found";
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
