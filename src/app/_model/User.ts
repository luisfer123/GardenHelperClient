import { Role } from "./Role";

export class User {
    id: number | null = null;
    username: string = '';
    email: string = '';
    roles: Array<Role> = new Array();
}