import axios from "axios";

export function GetAllHeroes() {
  return axios.get("/api/dotawin/heroes");
}

export function InsertMatchup(matchupToInsert) {
  return axios.post("/api/dotawin/matchup", {
    TemplateName: matchupToInsert.templateName,
    RadiantTeamInfo: matchupToInsert.radiantTeam,
    DireTeamInfo: matchupToInsert.direTeam
  });
}

export function GetTemplates() {
  return axios.get("/api/dotawin/templates");
}
