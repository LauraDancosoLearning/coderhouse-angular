import { RolType } from "../dashboard/users/models/rol.enum";

export const ROUTER_LINKS: { link: string;  name:string, roles: RolType[], disabled: boolean}[] = [
    {
      link: '/dashboard',
      name: 'Home',
      roles:[ RolType.Default, RolType.Admin],
      disabled: true
    },
    {
      link: '/dashboard/users',
      name: 'Users',
      roles:[ RolType.Admin],
      disabled: true
    },
    {
      link: '/dashboard/students',
      name: 'Students',
      roles:[ RolType.Default, RolType.Admin],
      disabled: true
    },
    {
      link: '/dashboard/courses',
      name: 'Courses',
      roles:[ RolType.Default, RolType.Admin],
      disabled: true
    },
];