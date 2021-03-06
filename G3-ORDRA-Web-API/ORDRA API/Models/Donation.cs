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
    
    public partial class Donation
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Donation()
        {
            this.Donated_Product = new HashSet<Donated_Product>();
        }
    
        public int DonationID { get; set; }
        public Nullable<int> DonationStatusID { get; set; }
        public Nullable<int> RecipientID { get; set; }
        public Nullable<float> DonAmount { get; set; }
        public Nullable<System.DateTime> DonDate { get; set; }
        public string DonDescription { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Donated_Product> Donated_Product { get; set; }
        public virtual Donation_Recipient Donation_Recipient { get; set; }
        public virtual Donation_Status Donation_Status { get; set; }
    }
}
