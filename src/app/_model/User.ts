import { Role } from "./Role";

export class User {
    id: number | null = null;
    username: string = '';
    email: string = '';
    firstName: string = '';
    middleName: string = '';
    lastName: string = '';
    secondLastName: string = '';
    roles: Array<Role> = new Array();

    static fromData(dataUser: User): User {
        let user: User = new User();

        user.id = dataUser.id;
        user.username = dataUser.username;
        user.email = dataUser.email;
        user.firstName = dataUser.firstName;
        user.middleName = dataUser.middleName;
        user.lastName = dataUser.lastName;
        user.secondLastName = dataUser.secondLastName;

        return user;
    }
}