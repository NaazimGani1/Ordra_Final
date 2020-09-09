using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ORDRA_API.Models
{
    public class searchLocation
    {
        public string LocName { get; set; }
        public int ContainerID { get; set; }
        public int LocationStatusID { get; set; }
        public int AreaID { get; set; }
    }
}