import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/auth.store'

// Layouts
import PublicLayout from './components/layout/PublicLayout'
import StudentLayout from './components/layout/StudentLayout'
import InstructorLayout from './components/layout/InstructorLayout'
import AdminLayout from './components/layout/AdminLayout'
import SuperAdminLayout from './components/layout/SuperAdminLayout'

// Public pages
import HomePage from './pages/public/HomePage'
import AboutPage from './pages/public/AboutPage'
import ProgramsPage from './pages/public/ProgramsPage'
import AdmissionsPage from './pages/public/AdmissionsPage'
import EventsPage from './pages/public/EventsPage'
import BlogPage from './pages/public/BlogPage'
import BlogPostPage from './pages/public/BlogPostPage'
import ContactPage from './pages/public/ContactPage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import VerifyCertPage from './pages/public/VerifyCertPage'

// Student
import StudentDashboard from './pages/student/Dashboard'
import StudentCourses from './pages/student/Courses'
import StudentLesson from './pages/student/Lesson'
import StudentAssignments from './pages/student/Assignments'
import StudentQuizzes from './pages/student/Quizzes'
import StudentProjects from './pages/student/Projects'
import StudentCertificates from './pages/student/Certificates'
import StudentResources from './pages/student/Resources'
import StudentPayments from './pages/student/Payments'
import StudentProfile from './pages/student/Profile'

// Instructor
import InstructorDashboard from './pages/instructor/Dashboard'
import InstructorCourses from './pages/instructor/Courses'
import InstructorAttendance from './pages/instructor/Attendance'
import InstructorGrades from './pages/instructor/Grades'
import InstructorStudents from './pages/instructor/Students'
import InstructorLessonEditor from './pages/instructor/LessonEditor'
import InstructorAssignmentEditor from './pages/instructor/AssignmentEditor'
import InstructorQuizEditor from './pages/instructor/QuizEditor'

// Admin
import AdminDashboard from './pages/admin/Dashboard'
import AdminStudents from './pages/admin/Students'
import AdminInstructors from './pages/admin/Instructors'
import AdminCourses from './pages/admin/Courses'
import AdminCurriculum from './pages/admin/Curriculum'
import AdminCertificates from './pages/admin/Certificates'
import AdminPayments from './pages/admin/Payments'
import AdminAnnouncements from './pages/admin/Announcements'
import AdminEvents from './pages/admin/Events'
import AdminBlog from './pages/admin/Blog'
import AdminAuditLogs from './pages/admin/AuditLogs'

// Super Admin
import SuperAdminDashboard from './pages/superadmin/Dashboard'
import SuperAdminUsers from './pages/superadmin/Users'
import SuperAdminSettings from './pages/superadmin/Settings'

const Guard = ({ children, roles }: { children: React.ReactNode; roles: string[] }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!user || !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />
  return <>{children}</>
}

const RoleRedirect = () => {
  const { user, isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  const map: Record<string, string> = { student:'/student/dashboard', instructor:'/instructor/dashboard', admin:'/admin/dashboard', super_admin:'/superadmin/dashboard' }
  return <Navigate to={map[user?.role ?? ''] ?? '/login'} replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/verify/:certNumber" element={<VerifyCertPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/portal" element={<RoleRedirect />} />

      <Route path="/student" element={<Guard roles={['student']}><StudentLayout /></Guard>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="courses/:courseId/lesson/:lessonId" element={<StudentLesson />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="quizzes" element={<StudentQuizzes />} />
        <Route path="projects" element={<StudentProjects />} />
        <Route path="certificates" element={<StudentCertificates />} />
        <Route path="resources" element={<StudentResources />} />
        <Route path="payments" element={<StudentPayments />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      <Route path="/instructor" element={<Guard roles={['instructor','admin','super_admin']}><InstructorLayout /></Guard>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<InstructorDashboard />} />
        <Route path="courses" element={<InstructorCourses />} />
        <Route path="courses/:courseId/lessons/new" element={<InstructorLessonEditor />} />
        <Route path="courses/:courseId/lessons/:lessonId/edit" element={<InstructorLessonEditor />} />
        <Route path="courses/:courseId/assignments/new" element={<InstructorAssignmentEditor />} />
        <Route path="courses/:courseId/quizzes/new" element={<InstructorQuizEditor />} />
        <Route path="attendance" element={<InstructorAttendance />} />
        <Route path="grades" element={<InstructorGrades />} />
        <Route path="students" element={<InstructorStudents />} />
      </Route>

      <Route path="/admin" element={<Guard roles={['admin','super_admin']}><AdminLayout /></Guard>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="instructors" element={<AdminInstructors />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="curriculum" element={<AdminCurriculum />} />
        <Route path="certificates" element={<AdminCertificates />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="audit-logs" element={<AdminAuditLogs />} />
      </Route>

      <Route path="/superadmin" element={<Guard roles={['super_admin']}><SuperAdminLayout /></Guard>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="users" element={<SuperAdminUsers />} />
        <Route path="settings" element={<SuperAdminSettings />} />
      </Route>

      <Route path="/unauthorized" element={
        <div className="min-h-screen flex items-center justify-center bg-ink-900">
          <div className="text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">Access Denied</h2>
            <p className="text-slate-400 mb-6">You don't have permission to view this page.</p>
            <a href="/" className="btn-primary">Back to Home</a>
          </div>
        </div>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
