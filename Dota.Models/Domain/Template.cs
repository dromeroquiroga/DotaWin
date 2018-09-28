using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dota.Models.Domain
{
    public class Template
    {
        public int TemplateId { get; set; }
        public string TemplateName { get; set; }
        public bool SidesSwitched { get; set; }
    }
}
