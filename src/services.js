import instance from "@/plugins/axios";

const PROJECT_URL = "/project";
const STATUS_URL = "/status";

export default {
  getProjects: () => instance.get(`${PROJECT_URL}/all`),
  getProjectById: (id) => instance.get(`${PROJECT_URL}/` + id),
  getStatus: () => instance.get(`${STATUS_URL}`),
}
