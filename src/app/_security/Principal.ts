import { Role } from "../_model/Role";

export class Principal {
    
    id: number | null = null;
    username: string = '';
    email: string = '';
    roles: Array<Role> = new Array();

    static fromData(data: Principal): Principal {
        const principal = new Principal();
        principal.id = data.id;
        principal.username = data.username;
        principal.email = data.email;
        principal.roles = data.roles;

        return principal;
    }
}