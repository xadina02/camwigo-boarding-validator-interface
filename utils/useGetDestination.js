import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";

const useGetDestinations = (token, routeId, security) => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // console.log("useGetDestinations hook called");
    const fetchDestinations = async () => {
      try {
        const response = await API.getDestinations(token, routeId, security);
        const statusCode = response[0];
        const res = response[1];
        // console.log('API response: ', res);
        const status = response[2];

        if (status) {
          setDestinations(res.data);
          // console.log('Fetched destinations: ', res.data);
        } else if (statusCode === 404) {
          toast.error(res.message);
          // console.log('Destinations Empty: ', res.message);
        }
      } catch (error) {
        toast.error(error.message);
        // console.error('Fetch destinations error: ', error);
      }
    };

    fetchDestinations();
  }, [token, routeId, security]);

  return { destinations };
};

export default useGetDestinations;
