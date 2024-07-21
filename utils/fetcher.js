export const API = {
  /**
   * Execute a query
   * @param url
   * @param method
   * @param body
   * @param token
   * @param security
   * @returns
   */
  execute: async (url, method = "GET", data = null, token = null, security) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      AppToken: security,
    };

    try {
      const response = await fetch(
        `http://192.168.103.124:8000/api/v1/en/validator/${url}`,
        {
          method: method,
          headers,
          body: data,
        }
      );

      if (response) {
        const json = await response.json();
        return [response.status, json, response.ok];
      }
    } catch (error) {
      console.error("Fetch error: ", error);
      return [null, null, false];
    }

    return [null, null, false];
  },

  /**
   * Process the response after the query has been executed
   * @param res
   * @returns
   */
  processResponse: async (res) => {
    if (!res[2]) {
      throw new Error(res[1].message);
    }
    return res[1].data;
  },

  /**
   * API request to register user
   * @param token
   * @param data
   * @param security
   * @returns
   */
  logUserIn: async (data, security) => {
    const res = await API.execute(
      "auth/login",
      "POST",
      JSON.stringify(data),
      null,
      security
    );
    return res;
  },

  /**
   * API request to get all origins
   * @param token
   * @param security
   * @returns
   */
  getAllOrigins: async (token, security) => {
    const res = await API.execute("routes/all", "GET", null, token, security);
    return res;
  },

  /**
   * API request to get all origin-destinations
   * @param token
   * @param routeId
   * @param security
   * @returns
   */
  getDestinations: async (token, routeId, security) => {
    const res = await API.execute(
      `route-destinations/${routeId}/all`,
      "GET",
      null,
      token,
      security
    );
    return res;
  },

  /**
   * API request to get all destination-schedules
   * @param token
   * @param routeDestinationId
   * @param security
   * @returns
   */
  getSchedules: async (token, routeDestinationId, security) => {
    const res = await API.execute(
      `route-schedules/${routeDestinationId}`,
      "GET",
      null,
      token,
      security
    );
    return res;
  },

  /**
   * API request to get all unique schedule-vehicles
   * @param token
   * @param routeScheduleId
   * @param security
   * @returns
   */
  getVehicles: async (token, routeScheduleId, security) => {
    const res = await API.execute(
      `schedule-vehicles/${routeScheduleId}`,
      "GET",
      null,
      token,
      security
    );
    return res;
  },

  /**
   * API request to validate the ticket
   * @param token
   * @param vehicleRouteDestinationId
   * @param data
   * @param security
   * @returns
   */
  validateTicket: async (token, data, security) => {
    const res = await API.execute(
      "validate",
      "POST",
      JSON.stringify(data),
      token,
      security
    );
    return res;
  },
};
