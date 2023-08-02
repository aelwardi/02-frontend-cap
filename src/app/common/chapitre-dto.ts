import { Chapitre } from "./chapitre";
import { Section } from "./section";

export class ChapitreDTO {
    constructor(
        public id?: any,
        public chapitre?: Chapitre,
        public sections: any[] = []
    ){}
}
