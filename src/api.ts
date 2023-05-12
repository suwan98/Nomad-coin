import axios from "axios";

const BASE_URL = "https://api.coinpaprika.com/v1";
const CUSTOM_URL = "https://ohlcv-api.nomadcoders.workers.dev";

export const fetchCoins = async () => {
  return axios
    .get("https://api.coinpaprika.com/v1/coins")
    .then((res) => res.data);
};

export const fetchCoinInfoData = async (coinId: string) => {
  return await axios.get(`${BASE_URL}/coins/${coinId}`).then((res) => res.data);
};

export const fetchCoinPriceData = async (coinId: string) => {
  return await axios
    .get(`${BASE_URL}/tickers/${coinId}`)
    .then((res) => res.data);
};

export const fetchCoinHistoryData = async (coinId: string) => {
  const response = await axios.get(`${CUSTOM_URL}/?coinId=${coinId}`);
  return response.data;
};
