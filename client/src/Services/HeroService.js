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

export function GetWinPercentages(bothTeams) {
  return axios.put(`/api/dotawin/matchup/teamWinRates`, {
    RadiantHero1: bothTeams.radiantHero1,
    RadiantHero1Position: bothTeams.radiantHero1Position,
    RadiantHero2: bothTeams.radiantHero2,
    RadiantHero2Position: bothTeams.radiantHero2Position,
    RadiantHero3: bothTeams.radiantHero3,
    RadiantHero3Position: bothTeams.radiantHero3Position,
    RadiantHero4: bothTeams.radiantHero4,
    RadiantHero4Position: bothTeams.radiantHero4Position,
    RadiantHero5: bothTeams.radiantHero5,
    RadiantHero5Position: bothTeams.radiantHero5Position,
    DireHero1: bothTeams.direHero1,
    DireHero1Position: bothTeams.direHero1Position,
    DireHero2: bothTeams.direHero2,
    DireHero2Position: bothTeams.direHero2Position,
    DireHero3: bothTeams.direHero3,
    DireHero3Position: bothTeams.direHero3Position,
    DireHero4: bothTeams.direHero4,
    DireHero4Position: bothTeams.direHero4Position,
    DireHero5: bothTeams.direHero5,
    DireHero5Position: bothTeams.direHero5Position
  });
}
