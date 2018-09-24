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
        public decimal TopLaneWinRate { get; set; }
        public decimal MidLaneWinRate { get; set; }
        public decimal BotLaneWinRate { get; set; }
        public int HeroTier { get; set; }
    }
}
