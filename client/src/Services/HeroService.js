import axios from "axios";

export function GetAllHeroes() {
  return axios.get("/api/heroes");
}
