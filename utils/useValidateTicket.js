import { useState } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";

const useValidateTicket = () => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const validateTicket = async (token, data, security) => {
      setLoading(true);
      try {
        const response = await API.validateTicket(token, data, security);
        const statusCode = response[0];
        const res = response[1];
        const status = response[2];

        if (status) {
          setTicket(res.data);
        } else if (statusCode === 404) {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    validateTicket();
  }, [token, data, security]);

  return { ticket, loading };
};

export default useValidateTicket;
