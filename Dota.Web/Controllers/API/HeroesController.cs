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
    [RoutePrefix("api/heroes")]
    public class HeroesController : ApiController
    {
        readonly HeroService heroService;

        public HeroesController(HeroService heroService)
        {
            this.heroService = heroService;
        }

        [Route, HttpGet]
        public HttpResponseMessage GetAllHeroes()
        {
            List<Hero> heroList = heroService.getAll();

            return Request.CreateResponse(HttpStatusCode.OK, heroList);
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetHeroById(int id)
        {
            Hero selectedHero = new Hero();

            selectedHero.HeroName = "Hero";
            selectedHero.HeroId = 0;
            selectedHero.HeroTier = 1;
            selectedHero.PrimaryAttribute = 1;
            selectedHero.TopLaneWinRate = 1 * 100;
            selectedHero.MidLaneWinRate = 1 * 100;
            selectedHero.BotLaneWinRate = 1 * 100;

            return Request.CreateResponse(HttpStatusCode.OK, selectedHero);
        }

        [Route, HttpPost]
        public HttpResponseMessage InsertHero(CreateHeroRequest model)
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Take It Easy Big Shoots!");
        }

        // PUT: api/Heroes/5
        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage UpdateHero(int id, HeroUpdateRequest model)
        {
            return Request.CreateResponse(HttpStatusCode.OK, "New Guy Commin Through Bud!");
        }

        // DELETE: api/Heroes/5
        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage DeleteHero(int id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Hes Dead Jim!");
        }
    }
}
