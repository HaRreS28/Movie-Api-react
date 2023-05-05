import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";

class AuthService {
  async login(email, password) {
    console.log(email);
    if (!localStorage.getItem("user")) {
      const response = await axios.post(API_URL + "signin", {
        email: email,
        password: password,
      });
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(email, password) {
    if (!localStorage.getItem("user")) {
      const response = axios.post(API_URL + "signup", {
        email: email,
        password: password,
      });
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
