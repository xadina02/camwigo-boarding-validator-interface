import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";

const useGetOrigins = (token, security) => {
  const [origins, setOrigins] = useState([]);

  useEffect(() => {
    // console.log("useGetOrigins hook called");
    const fetchOrigins = async () => {
      try {
        const response = await API.getAllOrigins(token, security);
        const statusCode = response[0];
        const res = response[1];
        // console.log('API response: ', res);
        const status = response[2];

        if (status) {
          setOrigins(res.data);
          // console.log('Fetched origins: ', res.data);
        } else if (statusCode === 404) {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error(error.message);
        // console.error('Fetch origins error: ', error);
      }
    };

    fetchOrigins();
  }, [token, security]);

  return { origins };
};

export default useGetOrigins;
