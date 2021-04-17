import instance from "@/plugins/axios";

const PROJECT_URL = "/project";
const STATUS_URL = "/status";
const CONTACT_URL = "/contact";

export default {
  getProjects: () => instance.get(`${PROJECT_URL}/all`),
  getProjectById: (id) => instance.get(`${PROJECT_URL}/` + id),
  getStatus: () => instance.get(`${STATUS_URL}`),
  submitForm: (body) => instance.post(`${CONTACT_URL}`, body).then((response) => { console.log(response.data); })
}
