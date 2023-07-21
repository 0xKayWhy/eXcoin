import { useEffect, useState, createContext, useContext } from "react";
import axiosConfig from "../config/axios";
import { useNavigate } from "react-router-dom";

export const RouteContext = createContext(null);

export function useRoute() {
  const useRouteContext = useContext(RouteContext);
  if (!useRouteContext) {
    throw new Error("Not in provider");
  }
  return useRouteContext;
}

export default function RouteProvider(props) {
  const [selectCoin, setSelectCoin] = useState(undefined);
  const [rowFormat, setRowFormat] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowNum, setRowNum] = useState(1);
  const [ranking, setRanking] = useState(undefined);
  const [logo, setLogo] = useState(undefined);
  const [display, setDisplay] = useState(undefined);
  const [user, setUser]=useState({})
  const [isLoggedin, setIsLoggedin] = useState(false)


  const getRank = async () => {
    const res = await axiosConfig.get("",{
        params : {start : rowNum, limit : rowFormat}
    });
    console.log("This",res)
    if (res.status === 200) {
      return res.data.sendData;
    }
  };

  const getLogo = async () => {
    const res = await axiosConfig.get("",{
        params : {start : rowNum, limit : rowFormat}
    });
    console.log("That",rowNum)
    if (res.status === 200) {
      return res.data.logoData.data;
    }

  };

  const mergeCoin = async () => {
    const logoArray = Object.entries(logo);
    const newRank = ranking.map((rank) => {
      const matchedLogo = logoArray.find((log) => log[1].id === rank.id);
      if (matchedLogo) {
        return { ...rank, 
            logo: matchedLogo[1].logo,
            description : matchedLogo[1].description,
            urls : matchedLogo[1].urls
        };
      }
      return rank;
    });
    setDisplay(newRank);
  };

  const fetchData = async () => {
    const rankData = await getRank();
    const logoData = await getLogo();
    setRanking(rankData);
    setLogo(logoData);
  };

  useEffect(() => {
    fetchData();

  }, [rowNum,rowFormat,currentPage]);

  useEffect(() => {
    if (ranking && logo) {
      mergeCoin();
    }
  }, [ranking]);

  console.log("Display", display);
  console.log("Logo", logo);

  const values = {
    selectCoin,
    setSelectCoin,
    display,
    setDisplay,
    rowNum,
    setRowNum,
    currentPage,
    setCurrentPage,
    rowFormat,
    setRowFormat,
    user,
    setUser,
    isLoggedin,
    setIsLoggedin

    
  };
  return (
    <RouteContext.Provider value={values}>
      {props.children}
    </RouteContext.Provider>
  );
}
