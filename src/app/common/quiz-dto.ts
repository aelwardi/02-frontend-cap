import { Proposition } from "./proposition";
import { Quiz } from "./quiz";

export class QuizDTO {
    constructor(
        public id?: any,
        public quiz?: Quiz,
        public propositions: Proposition[] = []
    ) { }
}
