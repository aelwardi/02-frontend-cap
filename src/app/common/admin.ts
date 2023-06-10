import { Departement } from "./departement";

export class Admin {
    constructor(
        public id: any,
        public firstName: string,
        public lastName: string,
        public DateBirth: Date,
        public phone: string,
        public sexe: string,
        public photo: string,
        public email: string,
        public password: string,
        public etat: boolean,
        public role: string,
        public departement: Departement,
        public superAdmin: any) {
    }

}
