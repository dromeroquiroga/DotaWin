using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dota.Models.Enums
{
    public class MatchEnums
    {
        public enum PositionEnums
        {
            OffLane = 1,
            MidLane = 2,
            SafeLane = 3,
            Jungle = 4,
            Roaming = 5
        }

        public enum LanePositions
        {
            ThreeOneOne = 1,
            TwoOneTwo = 2,
            OneTwoTwo = 3,
            OneOneTwoJung = 4,
            OneOneOneJungRoam = 5,
            OneOneTwoRoam = 6,
            OneOneOneRoamTwo = 7
        }
    }
}
