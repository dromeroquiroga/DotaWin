using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dota.Models.Requests
{
    public class UpdateTemplateInfo: CreateTemplateInfo
    {
        [Required]
        public int TemplateId { get; set; }
    }
}
