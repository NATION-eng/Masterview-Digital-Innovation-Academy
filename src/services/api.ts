import axios from 'axios'
import { useAuthStore } from '../store/auth.store'

const api = axios.create({ baseURL: '/api/v1', headers: { 'Content-Type': 'application/json' }, timeout: 30000 })

api.interceptors.request.use(cfg => {
  const t = useAuthStore.getState().accessToken
  if (t) cfg.headers.Authorization = `Bearer ${t}`
  return cfg
})

api.interceptors.response.use(r => r, async err => {
  const orig = err.config
  if (err.response?.status === 401 && !orig._retry) {
    orig._retry = true
    const rt = useAuthStore.getState().refreshToken
    if (!rt) { useAuthStore.getState().clearAuth(); window.location.href = '/login'; return Promise.reject(err) }
    try {
      const { data } = await axios.post('/api/v1/auth/refresh', { refreshToken: rt })
      const { accessToken, refreshToken } = data.data
      useAuthStore.getState().setAuth(useAuthStore.getState().user!, accessToken, refreshToken)
      orig.headers.Authorization = `Bearer ${accessToken}`
      return api(orig)
    } catch { useAuthStore.getState().clearAuth(); window.location.href = '/login' }
  }
  return Promise.reject(err)
})

export const authAPI = {
  register: (d: Record<string,string>) => api.post('/auth/register', d),
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  changePassword: (d: Record<string,string>) => api.patch('/auth/change-password', d),
}
export const courseAPI = {
  getAll: (p?: Record<string,unknown>) => api.get('/courses', { params: p }),
  getOne: (id: string) => api.get(`/courses/${id}`),
  create: (d: unknown) => api.post('/courses', d),
  update: (id: string, d: unknown) => api.put(`/courses/${id}`, d),
  delete: (id: string) => api.delete(`/courses/${id}`),
}
export const curriculumAPI = {
  getSchools: () => api.get('/schools'),
  createSchool: (d: unknown) => api.post('/schools', d),
  getDepartments: (sid?: string) => api.get('/departments', { params: { school: sid } }),
  createDepartment: (d: unknown) => api.post('/departments', d),
  getBadgeLevels: (cid: string) => api.get('/badge-levels', { params: { course: cid } }),
  createBadgeLevel: (d: unknown) => api.post('/badge-levels', d),
  getModules: (bid: string) => api.get('/modules', { params: { badgeLevel: bid } }),
  createModule: (d: unknown) => api.post('/modules', d),
  getWeeks: (mid: string) => api.get('/weeks', { params: { module: mid } }),
  createWeek: (d: unknown) => api.post('/weeks', d),
  getLessons: (wid: string) => api.get('/lessons', { params: { week: wid } }),
  getLesson: (id: string) => api.get(`/lessons/${id}`),
  createLesson: (d: unknown) => api.post('/lessons', d),
  updateLesson: (id: string, d: unknown) => api.put(`/lessons/${id}`, d),
}
export const enrollmentAPI = {
  enroll: (d: unknown) => api.post('/enrollments', d),
  mine: () => api.get('/enrollments/my-enrollments'),
  one: (id: string) => api.get(`/enrollments/${id}`),
  progress: (id: string, d: unknown) => api.patch(`/enrollments/${id}/progress`, d),
  all: (p?: Record<string,unknown>) => api.get('/enrollments', { params: p }),
}
export const assignmentAPI = {
  forCourse: (cid: string) => api.get('/assignments', { params: { course: cid } }),
  one: (id: string) => api.get(`/assignments/${id}`),
  create: (d: unknown) => api.post('/assignments', d),
  update: (id: string, d: unknown) => api.put(`/assignments/${id}`, d),
  submit: (id: string, d: FormData) => api.post(`/submissions/${id}`, d, { headers: { 'Content-Type': 'multipart/form-data' } }),
  grade: (id: string, d: unknown) => api.patch(`/submissions/${id}/grade`, d),
  mySubmissions: () => api.get('/submissions/my-submissions'),
}
export const quizAPI = {
  forCourse: (cid: string) => api.get('/quizzes', { params: { course: cid } }),
  one: (id: string) => api.get(`/quizzes/${id}`),
  create: (d: unknown) => api.post('/quizzes', d),
  attempt: (id: string) => api.post(`/quizzes/${id}/attempt`),
  submit: (aid: string, d: unknown) => api.post(`/quizzes/attempts/${aid}/submit`, d),
}
export const attendanceAPI = {
  mark: (d: unknown) => api.post('/attendance', d),
  forCourse: (cid: string) => api.get('/attendance', { params: { course: cid } }),
  mine: () => api.get('/attendance/my-attendance'),
  report: (cid: string) => api.get(`/attendance/report/${cid}`),
}
export const certificateAPI = {
  mine: () => api.get('/certificates/my-certificates'),
  issue: (d: unknown) => api.post('/certificates', d),
  verify: (n: string) => api.get(`/certificates/verify/${n}`),
  revoke: (id: string, reason: string) => api.patch(`/certificates/${id}/revoke`, { reason }),
  all: () => api.get('/certificates'),
}
export const paymentAPI = {
  initPaystack: (d: unknown) => api.post('/payments/paystack/initialize', d),
  verifyPaystack: (ref: string) => api.get(`/payments/paystack/verify/${ref}`),
  initFlutterwave: (d: unknown) => api.post('/payments/flutterwave/initialize', d),
  mine: () => api.get('/payments/my-payments'),
  all: (p?: Record<string,unknown>) => api.get('/payments', { params: p }),
  summary: () => api.get('/payments/financial-summary'),
}
export const userAPI = {
  all: (p?: Record<string,unknown>) => api.get('/users', { params: p }),
  one: (id: string) => api.get(`/users/${id}`),
  update: (id: string, d: unknown) => api.put(`/users/${id}`, d),
  suspend: (id: string) => api.patch(`/users/${id}/suspend`),
  activate: (id: string) => api.patch(`/users/${id}/activate`),
  remove: (id: string) => api.delete(`/users/${id}`),
}
export const announcementAPI = {
  all: () => api.get('/announcements'),
  create: (d: unknown) => api.post('/announcements', d),
  update: (id: string, d: unknown) => api.put(`/announcements/${id}`, d),
  remove: (id: string) => api.delete(`/announcements/${id}`),
}
export const eventAPI = {
  all: (p?: Record<string,unknown>) => api.get('/events', { params: p }),
  one: (id: string) => api.get(`/events/${id}`),
  create: (d: unknown) => api.post('/events', d),
  update: (id: string, d: unknown) => api.put(`/events/${id}`, d),
}
export const blogAPI = {
  all: (p?: Record<string,unknown>) => api.get('/blog', { params: p }),
  one: (slug: string) => api.get(`/blog/${slug}`),
  create: (d: unknown) => api.post('/blog', d),
  update: (id: string, d: unknown) => api.put(`/blog/${id}`, d),
}
export const projectAPI = {
  mine: () => api.get('/projects/my-projects'),
  create: (d: unknown) => api.post('/projects', d),
  update: (id: string, d: unknown) => api.put(`/projects/${id}`, d),
  all: () => api.get('/projects'),
  review: (id: string, d: unknown) => api.patch(`/projects/${id}/review`, d),
}
export const notificationAPI = {
  mine: () => api.get('/notifications'),
  read: (id: string) => api.patch(`/notifications/${id}/read`),
  readAll: () => api.patch('/notifications/mark-all-read'),
}
export const dashboardAPI = {
  student: () => api.get('/dashboard/student'),
  instructor: () => api.get('/dashboard/instructor'),
  admin: () => api.get('/dashboard/admin'),
}
export const auditAPI = { logs: (p?: Record<string,unknown>) => api.get('/audit', { params: p }) }

export default api
