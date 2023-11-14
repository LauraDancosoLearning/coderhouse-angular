import { RolType } from "../dashboard/users/models/rol.enum";

export const ROUTER_LINKS: { link: string;  name:string, roles: RolType[]}[] = [
    {
      link: '/dashboard',
      name: 'Home',
      roles:[ RolType.Default, RolType.Admin]
    },
    {
      link: '/dashboard/users',
      name: 'Users',
      roles:[ RolType.Admin]
    },
    {
      link: '/dashboard/students',
      name: 'Students',
      roles:[ RolType.Default, RolType.Admin]
    },
    {
      link: '/dashboard/courses',
      name: 'Courses',
      roles:[ RolType.Default, RolType.Admin]
    }
];