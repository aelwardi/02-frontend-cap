import { cours } from "./cours";

export class Chapitre {
  constructor(
    public id: any = null,
    public titre: string = '',
    public description: string = '',
    public dateCreation: string = '',
    public dateUpdate: string = '',
    public tempsEstimer: string = '',
    public cours: cours | null = null
  ) {
  }
}
