using Dota.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dota.Models.Requests
{
    public class CreateTemplateInfo
    {
        [Required]
        public string TemplateName { get; set; }

        [Required]
        public List<TemplateMatchupInfo> RadiantTeamInfo { get; set; }

        [Required]
        public List<TemplateMatchupInfo> DireTeamInfo { get; set; }
    }
}
