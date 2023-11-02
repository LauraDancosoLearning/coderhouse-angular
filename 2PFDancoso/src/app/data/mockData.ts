import { Course } from "../dashboard/courses/models/course.model";
import { Enrollment } from "../dashboard/enrollments/models/enrollment.model";
import { Student } from "../dashboard/students/models/student.model";
import { RolType } from "../dashboard/users/models/rol.enum";
import { User } from "../dashboard/users/models/user.model";


export const USERS_MOCKED: User[] = [
  {
    id: 1,
    name: 'juan',
    lastName: 'ramirez',
    dni: 40808787,
    email: 'ljdfa@gmail.com',
    rol: RolType.Default
  },
  {
    id: 2,
    name: 'pepe',
    lastName: 'ramirez',
    dni: 32873297,
    email: 'ljdfa@gmail.com',
    rol: RolType.Default
  }
];

export const STUDENTS_MOCKED: Student[] = [
  {
    id: 1,
    name: 'juan',
    lastName: 'ramirez',
    dni: 40808787,
    email: 'ljdfa@gmail.com',
    marks: [9],
  },
  {
    id: 2,
    name: 'pepe',
    lastName: 'ramirez',
    dni: 32873297,
    email: 'ljdfa@gmail.com',
    marks: [10, 8],
  },
  {
    id: 3,
    name: 'martin',
    lastName: 'ramirez',
    dni: 32873297,
    email: 'ljdfa@gmail.com',
    marks: [5],
  },
  {
    id: 4,
    name: 'carlos',
    lastName: 'ramirez',
    dni: 32873297,
    email: 'ljdfa@gmail.com',
    marks: [10],
  },
];

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