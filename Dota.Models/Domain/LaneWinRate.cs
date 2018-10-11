using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dota.Models.Domain
{
    public class LaneWinRate
    {
        public int LaningPhaseId { get; set; }
        public string LaneAssignmentName { get; set; }
        public string LaneNumbers { get; set; }
        public decimal LaneAssignmentWinRate { get; set; }
    }
}
