import { apiClient } from "./api-client";

interface UserPayload {
  name: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
}
class HttpClient {
  #endPoint;
  constructor(endPoint: string) {
    this.#endPoint = endPoint;
  }

  getAll() {
    return apiClient.get(this.#endPoint + "/lists");
  }

  createUser(payload: UserPayload) {
    return apiClient.post(this.#endPoint + "/add", payload);
  }

  updateUser(id: string, payload: UserPayload) {
    return apiClient.put(this.#endPoint + "/" + id, payload);
  }

  deleteUser(id: string) {
    return apiClient.delete(this.#endPoint + "/" + id);
  }
}

const create = (endPoint: string) => {
  return new HttpClient(endPoint);
};
export default create;
