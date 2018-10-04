using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dota.Models.Domain
{
    public class TeamWinRates
    {
        public decimal RadiantWinRate { get; set; }
        public decimal DireWinRate { get; set; }

        public void ConvertTo100Descrepency()
        {
            if (RadiantWinRate == 0 && DireWinRate == 0)
            {
                RadiantWinRate = 50;
                DireWinRate = 50;
            }
            else if (RadiantWinRate == 0)
            {
                RadiantWinRate = 0;
                DireWinRate = 100;
            }
            else if (DireWinRate == 0)
            {
                RadiantWinRate = 100;
                DireWinRate = 0;
            }
            else if (RadiantWinRate > DireWinRate)
            {
                decimal difference = (RadiantWinRate - DireWinRate) / 2;

                RadiantWinRate = 50 + difference;
                DireWinRate = 50 - difference;
            }
            else
            {
                decimal difference = (DireWinRate - RadiantWinRate) / 2;

                RadiantWinRate = 50 - difference;
                DireWinRate = 50 + difference;
            }
        }
    }
}
