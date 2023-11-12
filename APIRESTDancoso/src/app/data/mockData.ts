import { Course } from "../dashboard/courses/models/course.model";
import { Enrollment } from "../dashboard/enrollments/models/enrollment.model";


export const COURSES_MOCKED: Course[] = [
  {
    id: 1,
    name: 'Angular',
    description: 'Angular de 0 a pro',
    startDate: new Date(2024, 1, 10),
    endDate: new Date(2024, 3, 10)
  }
]

export const ENROLLMENTS_MOCKED: Enrollment[] = [
  {
    id: 1,
    studentId: 1,
    courseId: 1
  },
  {
    id: 2,
    studentId: 2,
    courseId: 1
  }
]