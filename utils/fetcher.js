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
        `http://192.168.107.124:8000/api/v1/en/validator/${url}`,
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
   * @param data
   * @param security
   * @returns
   */
  registerUser: async (data, security) => {
    const res = await API.execute(
      "/auth/register/",
      "POST",
      JSON.stringify({ personalDetails: data }),
      null,
      security
    );
    return res;
  },

  /**
   * API request to get all origins
   * @param security
   * @returns
   */
  getAllOrigins: async (security) => {
    const res = await API.execute("routes/all", "GET", null, null, security);
    return res;
  },

  /**
   * API request to get all origin-destinations
   * @param routeId
   * @param security
   * @returns
   */
  getDestinations: async (routeId, security) => {
    const res = await API.execute(
      `route-destinations/${routeId}/all`,
      "GET",
      null,
      null,
      security
    );
    return res;
  },

  /**
   * API request to get all destination-schedules
   * @param routeDestinationId
   * @param security
   * @returns
   */
  getSchedules: async (routeDestinationId, security) => {
    const res = await API.execute(
      `route-schedules/${routeDestinationId}`,
      "GET",
      null,
      null,
      security
    );
    return res;
  },

  /**
   * API request to get all unique schedule-dates
   * @param routeScheduleId
   * @param security
   * @returns
   */
  getDates: async (routeScheduleId, security) => {
    const res = await API.execute(
      `journey-dates/${routeScheduleId}`,
      "GET",
      null,
      null,
      security
    );
    return res;
  },

  /**
   * API request to get travel journeys from search
   * @param security
   * @returns
   */
  getSearchedJourneys: async (routeScheduleId, journeyDate, security) => {
    const res = await API.execute(
      `vehicle-journey/${routeScheduleId}/${journeyDate}`,
      "GET",
      null,
      null,
      security
    );
    return res;
  },

  /**
   * API request to get top travel journeys for today
   * @param security
   * @returns
   */
  getTopTravelJourneys: async (security) => {
    const res = await API.execute(
      "top-travels",
      "GET",
      null,
      null,
      security
    );
    return res;
  },

  /**
   * API request to get travel journey details
   * @param vehicleRouteDestinationId
   * @param security
   * @returns
   */
  getTravelJourneyDetails: async (vehicleRouteDestinationId, security) => {
    const res = await API.execute(
      `vehicle-journey/${vehicleRouteDestinationId}`,
      "GET",
      null,
      null,
      security
    );
    return res;
  },

  /**
   * API request to make reservation
   * @param token
   * @param vehicleRouteDestinationId
   * @param data
   * @param security
   * @returns
   */
  makeReservation: async (token, vehicleRouteDestinationId, data, security) => {
    const res = await API.execute(
      `reservation/${vehicleRouteDestinationId}`,
      "POST",
      JSON.stringify({ reservation: data }),
      token,
      security
    );
    return res;
  },

  /**
   * API request to make payment
   * @param reservationId
   * @param data
   * @param security
   * @returns
   */
  makePayment: async (reservationId, data, security) => {
    const res = await API.execute(
      `make-payment/${reservationId}`,
      "POST",
      JSON.stringify({ paymentDetails: data }),
      null,
      security
    );
    return res;
  },

  /**
   * API request to get all tickets
   * @param security
   * @returns
   */
  getAllTickets: async (security) => {
    const res = await API.execute("tickets/all", "GET", null, null, security);
    return res;
  },

  /**
   * API request to get all tickets
   * @param reservationId
   * @param security
   * @returns
   */
  getTicket: async (reservationId, security) => {
    const res = await API.execute(`tickets/${reservationId}`, "GET", null, null, security);
    return res;
  },
};
