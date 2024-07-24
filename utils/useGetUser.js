import { useState, useEffect } from "react";
import Toast from 'react-native-toast-message';
import { API } from "./fetcher";
import useUserStore from '../zustand/useUserStore';

const useGetUser = () => {
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore(state => state.setUser);

    const fetchUser = async (data, security, callback) => {
      setLoading(true);
      try {
        const response = await API.logUserIn(data, security);
        const statusCode = response[0];
        const res = response[1];
        const status = response[2];

        if (status) {
          setUser(res.data);
          if (callback) {
            callback(res.data);
          }
        } else if (statusCode === 404) {
        //   toast.error(res.message);
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: res.message,
          });
        } else if (statusCode === 401) {
            //   toast.error(res.message);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: res.message,
              });
            }
      } catch (error) {
        // toast.error(error.message);
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error.message,
          });
      } finally {
        setLoading(false);
      }
    };

  return { loading, fetchUser };
};

export default useGetUser;
