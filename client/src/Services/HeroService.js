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

export function UpdateMatchup(updatedMatchup) {
  return axios.put("/api/dotawin/matchup", {
    TemplateId: updatedMatchup.TemplateId,
    TemplateName: updatedMatchup.TemplateName,
    RadiantTeamInfo: updatedMatchup.RadiantInfo,
    DireTeamInfo: updatedMatchup.DireInfo
  });
}

export function GetTemplates() {
  return axios.get("/api/dotawin/matchup");
}

export function GetMatchup(matchupId) {
  return axios.get(`/api/dotawin/matchup/${matchupId}`);
}

export function DeleteMatchup(matchupId) {
  return axios.delete(`/api/dotawin/matchup/${matchupId}`);
}
