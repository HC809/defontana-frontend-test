import axios from "axios";

const axiosRequest = axios.create();
axiosRequest.defaults.baseURL = "https://pokeapi.co/api/v2/pokemon";

axiosRequest.interceptors.response.use(
  (response) => {
    console.log(response.data);
    return response;
  },
  async function (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) return Promise.reject("Error de conexión. ");
      else {
        const errorMessage =
          (error.response && (error.response.data as string)) ||
          "Error desconocido.";
        return Promise.reject(errorMessage);
      }
    } else {
      console.log("No Axios Error:", error);
      return Promise.reject(error);
    }
  }
);

export default axiosRequest;
