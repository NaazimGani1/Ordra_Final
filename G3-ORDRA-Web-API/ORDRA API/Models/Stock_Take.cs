//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ORDRA_API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Stock_Take
    {
        public int StockTakeID { get; set; }
        public Nullable<int> EmployeeID { get; set; }
        public Nullable<System.DateTime> STakeDate { get; set; }
        public Nullable<int> STakeQuantity { get; set; }
        public string ProdCategory { get; set; }
        public string ProdName { get; set; }
    
        public virtual Employee Employee { get; set; }
    }
}
