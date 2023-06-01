export class Admin {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public dateBirth: Date,
        public phone: string,
        public sexe: string,
        public photo: string,
        public email: string,
        public pw: string,
        public etat: boolean,
        public departement_id: number,
        public super_admin_id: number) {
    }
}
