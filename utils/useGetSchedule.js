import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";

const useGetSchedules = (token, routeDestinationId, security) => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    // console.log("useGetSchedules hook called");
    const fetchSchedules = async () => {
      try {
        const response = await API.getSchedules(token, routeDestinationId, security);
        const statusCode = response[0];
        const res = response[1];
        // console.log('API response: ', res);
        const status = response[2];

        if (status) {
          setSchedules(res.data);
          // console.log('Fetched schedules: ', res.data);
        } else if (statusCode === 404) {
          toast.error(res.message);
          // console.log('Schedules Empty: ', res.message);
        }
      } catch (error) {
        toast.error(error.message);
        // console.error('Fetch schedules error: ', error);
      }
    };

    fetchSchedules();
  }, [token, routeDestinationId, security]);

  return { schedules };
};

export default useGetSchedules;
