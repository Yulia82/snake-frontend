import axios from "axios";

axios.defaults.baseURL = "https://snake-backend-cht2.onrender.com/api";


export async function getRecordPlayers() {
  const { data } = await axios.get("/players/record");
  return data;
}

export async function createPlayer(dataPlayer) {
  const { data } = await axios.post("/players", dataPlayer);
  return data.result;
}
  
