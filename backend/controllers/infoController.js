import { Router } from "express";
import dotenv from 'dotenv'
import axios from "axios"

const router = Router();
dotenv.config();

const fetchData = async (start, limit) => {
  try {
    const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${start}&limit=${limit}&sort=market_cap&cryptocurrency_type=all&tag=all`, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.API_KEY,
      }
    });
    const globalRes = await axios.get(`https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest`, {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.API_KEY,
        }
      });

    if (response.status  === 200 && globalRes.status === 200) {
      const sendData = response.data.data;
      const sendGlobal = globalRes.data.data
      console.log(globalRes.data.data);

      const logos = sendData.map((logo) => logo.id);
      const logosId = logos.join(',');

      const secondRes = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${logosId}`, {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.API_KEY,
        }
      });

      if (secondRes.status === 200) {
        const logoData = secondRes.data;
        return { logoData, sendData, sendGlobal };
      }
    }
  } catch (e) {
    console.log(e);
    throw new Error("Failed to fetch data");
  }
}

router.get('/', async (req, res) => {
  try {
    let { start, limit } = req.query;
    if(start !== undefined && limit !== undefined){
    const { logoData, sendData, sendGlobal } = await fetchData(start, limit);
    res.json({ logoData, sendData ,sendGlobal});
    console.log(start,limit);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default router;
