import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";

const useGetVehicles = (token, routeScheduleId, security) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // console.log("useGetVehicles hook called");
    const fetchVehicles = async () => {
      try {
        const response = await API.getVehicles(token, routeScheduleId, security);
        const statusCode = response[0];
        const res = response[1];
        // console.log('API response: ', res);
        const status = response[2];

        if (status) {
          setVehicles(res.data);
        //   console.log('Fetched vehicles: ', res.data);
        } else if (statusCode === 404) {
          toast.error(res.message);
        //   console.log('Vehicles Empty: ', res.message);
        }
      } catch (error) {
        toast.error(error.message);
        // console.error('Fetch Vehicles error: ', error);
      }
    };

    fetchVehicles();
  }, [token, routeScheduleId, security]);

  return { vehicles };
};

export default useGetVehicles;
