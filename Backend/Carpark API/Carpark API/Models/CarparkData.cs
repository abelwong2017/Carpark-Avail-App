using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Carpark_API.Models
{
    public class CarparkData
    {

        public class Rootobject
        {
            public Api_Info api_info { get; set; }
            public Item[] items { get; set; }
        }

        public class Api_Info
        {
            public string status { get; set; }
        }

        public class Item
        {
            public DateTime timestamp { get; set; }
            public Carpark_Data[] carpark_data { get; set; }
        }

        public class Carpark_Data
        {
            public string total_lots { get; set; }
            public string lot_type { get; set; }
            public string lots_available { get; set; }
        }

    }
}
