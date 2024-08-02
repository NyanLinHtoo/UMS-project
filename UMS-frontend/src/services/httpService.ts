import { apiClient } from "./api-client";

class HttpClient {
  #endPoint;
  constructor(endPoint: string) {
    this.#endPoint = endPoint;
  }

  getAll() {
    return apiClient.get(this.#endPoint + "/lists");
  }
}

const create = (endPoint: string) => {
  return new HttpClient(endPoint);
};
export default create;
