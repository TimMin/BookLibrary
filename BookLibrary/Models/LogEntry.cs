using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookLibrary.Models
{

    public class LogEntry
    {
        public int Id { get; set; }
        public int Person { get; set; }
        public int Book { get; set; }
        public DateTime Borrowed { get; set; }
        public DateTime Returned { get; set; }
    }
}