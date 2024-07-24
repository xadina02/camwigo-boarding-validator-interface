import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { Audio } from "expo-av";
import { API } from "./fetcher";

// Initialize sound objects
const successSound = new Audio.Sound();
const failureSound = new Audio.Sound();

const useValidateTicket = () => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await successSound.loadAsync(require('../assets/sounds/success.wav'));
      await failureSound.loadAsync(require('../assets/sounds/failure.mp3'));
    })();

    return () => {
      successSound.unloadAsync();
      failureSound.unloadAsync();
    };
  }, []);

  // useEffect(() => {
  const validateTicket = async (token, data, security, callback) => {
    // console.log("useValidateTicket hook called!");
    setLoading(true);
    try {
      // console.log('Data: ', data);
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
        await successSound.playAsync();
      } else if (statusCode === 404) {
        // console.log(res.message);
        if (callback) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: res.message,
          });
          callback(ticket);
        }
        await failureSound.playAsync();
      } else if (statusCode === 429) {
        // toast.error("Too Many Attempts. Please try again later.");
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Too Many Attempts. Please try again later.",
        });
        await failureSound.playAsync();
      }
    } catch (error) {
      // toast.error(error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
      await failureSound.playAsync();
    } finally {
      setLoading(false);
    }
  };

  // validateTicket();
  // }, [token, data, security]);

  return { ticket, loading, validateTicket };
};

export default useValidateTicket;
