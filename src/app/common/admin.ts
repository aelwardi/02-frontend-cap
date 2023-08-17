import { Departement } from "./departement";

export class Admin {
    constructor(
        public id: any,
        public firstName?: string,
        public lastName?: string,
        public dateBirth?: Date,
        public phone?: string,
        public sexe?: string,
        public photo?: any,
        public email?: string,
        public password?: string,
        public etat?: boolean,
        public role?: string,
        public departement?: any) {
    }

    
      static fromId(id: number) {
        return new Admin(id);
      }

}
