import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { API } from "./fetcher";

const useValidateTicket = () => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
    const validateTicket = async (token, data, security, callback) => {
      // console.log("useValidateTicket hook called!");
      setLoading(true);
      try {
        const response = await API.validateTicket(token, data, security);
        const statusCode = response[0];
        const res = response[1];
        const status = response[2];

        // console.log("API response: ", response);

        if (status) {
          setTicket(res.data);
          if (callback) {
            callback(res.data);
          }
        } else if (statusCode === 404) {
          // toast.error(res.message);
          if (callback) {
            callback(ticket);
          }
        } else if (statusCode === 429) {
          // toast.error("Too Many Attempts. Please try again later.");
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Too Many Attempts. Please try again later.",
          });
        }
      } catch (error) {
        // toast.error(error.message);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    // validateTicket();
  // }, [token, data, security]);

  return { ticket, loading, validateTicket };
};

export default useValidateTicket;
