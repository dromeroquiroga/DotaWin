using Dota.Models.Domain;
using Dota.Models.Requests;
using Dota.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Dota.Web.Controllers.API
{
    [RoutePrefix("api/dotawin")]
    public class HeroesController : ApiController
    {
        readonly HeroService heroService;

        public HeroesController(HeroService heroService)
        {
            this.heroService = heroService;
        }

        [Route("heroes"), HttpGet]
        public HttpResponseMessage GetAllHeroes()
        {
            List<Hero> heroList = heroService.getAll();

            return Request.CreateResponse(HttpStatusCode.OK, heroList);
        }

        [Route("matchup"), HttpPost]
        public HttpResponseMessage CreateMatchup(CreateTemplateInfo matchCreateRequest)
        {
            if (matchCreateRequest == null)
            {
                ModelState.AddModelError("", "You Need a JSON Body There Chief!");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            heroService.InsertMatchTemplate(matchCreateRequest);
            return Request.CreateResponse(HttpStatusCode.OK, "Take It Easy Big Shoots!");
        }

        [Route("templates"), HttpGet]
        public HttpResponseMessage GetTemplateList()
        {
            List<Template> templateList = heroService.getTemplates();

            return Request.CreateResponse(HttpStatusCode.OK, templateList);
        }

        [Route("matchup"), HttpGet]
        public HttpResponseMessage GetMatchup(int templateId)
        {


            return Request.CreateResponse(HttpStatusCode.OK, "New Guy Commin Through Bud!");
        }

        // DELETE: api/Heroes/5
        [Route("templates"), HttpDelete]
        public HttpResponseMessage DeleteHero(int id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Hes Dead Jim!");
        }
    }
}
