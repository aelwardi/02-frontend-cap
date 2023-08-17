import { Departement } from "./departement";

export class Projet {
    constructor(
        public id: any,
        public name?: string,
        public nameClient?: string,
        public description?: string,
        public photo?: any
    ) { }
}
