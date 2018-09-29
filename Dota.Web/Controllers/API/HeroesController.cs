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

        [Route("matchup"), HttpGet]
        public HttpResponseMessage GetTemplateList()
        {
            List<Template> templateList = heroService.getTemplates();

            return Request.CreateResponse(HttpStatusCode.OK, templateList);
        }

        [Route("matchup"), HttpPut]
        public HttpResponseMessage UpdateMatchup(UpdateTemplateInfo matchUpdateRequest)
        {
            if (matchUpdateRequest == null)
            {
                ModelState.AddModelError("", "You Need A Body For This Request!");
            }

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            heroService.UpdateMatchTemplate(matchUpdateRequest);
            return Request.CreateResponse(HttpStatusCode.OK, "You Updated My Guy!");
        }

        [Route("matchup/{templateId:int}"), HttpDelete]
        public HttpResponseMessage DeleteMatchup(int templateId)
        {
            heroService.DeleteMatchup(templateId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("matchup/{templateId:int}"), HttpGet]
        public HttpResponseMessage GetMatchup(int templateId)
        {

            List<Hero> matchList = heroService.getMatchup(templateId);

            return Request.CreateResponse(HttpStatusCode.OK, matchList);
        }
    }
}
