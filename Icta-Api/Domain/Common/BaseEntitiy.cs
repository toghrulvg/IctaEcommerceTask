using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common
{
    public abstract class BaseEntitiy
    {
        public int Id { get; set; }
        public bool SoftDelete { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
