import { authApiClient } from "./api-client";

export interface LoginPayload {
  email: string;
  password: string;
}

class LoginService {
  login(payload: LoginPayload) {
    return authApiClient.post("/login", payload);
  }
}

const loginService = new LoginService();
export default loginService;
