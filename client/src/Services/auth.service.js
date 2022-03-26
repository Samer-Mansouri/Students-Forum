
import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login(data) {
    return api
      .post("/users/login", data)
      .then(response => {
        if (response.data.access) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    return api.post('/users/logout', {refresh_token: TokenService.getLocalRefreshToken()});
  }

  register(data) {
    return api.post("/users/register", data);
  }

  getCurrentUser() {
    return TokenService.getUser();
  }
}

export default new AuthService();