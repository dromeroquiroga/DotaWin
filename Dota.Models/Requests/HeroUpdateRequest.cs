using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dota.Models.Requests
{
    public class HeroUpdateRequest: CreateHeroRequest
    {
        [Required]
        public int HeroId { get; set; }
    }
}
