using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dota.Models.Domain
{
    public class TemplateMatchupInfo
    {
        public int HeroId { get; set; }
        public int Position { get; set; }
        public bool IsRadiant { get; set; }
    }
}
