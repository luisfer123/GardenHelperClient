export class UpdateUserPersonalInfo {
    firstName: string = '';
    middleName: string = '';
    lastName: string = '';
    secondLastName: string = '';

    static fromFormData(formData: UpdateUserPersonalInfo): UpdateUserPersonalInfo {
        return Object.assign({}, formData);
    }
}