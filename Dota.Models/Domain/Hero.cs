using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dota.Models.Domain
{
    public class Hero
    {
        public int HeroId { get; set; }
        public string HeroName { get; set; }
        public int PrimaryAttribute { get; set; }
        public string HeroImage { get; set; }
        public string HeroSelectedImage { get; set; }
        public string HeroMinimapIcon { get; set; }
        public bool IsRadiant { get; set; }
        public int Position { get; set; }
        public int HeroTier { get; set; }
    }
}
