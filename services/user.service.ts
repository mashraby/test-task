import { apiInstance } from "@/lib/api";
import { handleError } from "@/lib/utils";

async function getUsers() {
  try {
    const users = await apiInstance.get("/users").then((res) => res.data);

    return users;
  } catch (err) {
    handleError(err);
  }
}

export { getUsers };
