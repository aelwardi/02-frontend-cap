import { Departement } from "./departement";

export class Apprenant {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public DateBirth?: Date,
    public phone?: string,
    public sexe?: string,
    public photo?: any,
    public email?: string,
    public password?: string,
    public etat?: boolean,
    public role?: string,
    public departement?: Departement,
    public admin?: any
  ) {
  }

}
