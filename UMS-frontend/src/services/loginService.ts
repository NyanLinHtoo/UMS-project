import { authApiClient } from "./api-client";

// Define an interface for the login payload
export interface LoginPayload {
  username: string;
  password: string;
  // Add any other fields that your login payload might have
}

class LoginService {
  login(payload: LoginPayload) {
    return authApiClient.post("/login", payload);
  }
}

const loginService = new LoginService();
export default loginService;
