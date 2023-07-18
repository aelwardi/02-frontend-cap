import { Projet } from "./projet";
export class cours {
  constructor(
    public id: any,
    public title?: string,
    public description?: string,
    public dateCreate?: string,
    public dateMAJ?: string,
    public estimateTime?: string,
    public url?: any,
    public actor?: any,
    public Projet?: any
  ) { }
}
