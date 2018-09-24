using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dota.Models.Requests
{
    public class CreateHeroRequest
    {
        [Required]
        public string HeroName { get; set; }

        [Required]
        public int PrimaryAttribute { get; set; }

        [Required]
        public int HeroTier { get; set; }
    }
}
