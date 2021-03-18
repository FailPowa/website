import instance from "@/plugins/axios";

const PROJECT_URL = "/project";

export default {
  getProjects: () => instance.get(`${PROJECT_URL}/all`),
  getProjectById: (id) => instance.get(`${PROJECT_URL}/` + id),
}
