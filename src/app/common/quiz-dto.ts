import { Proposition } from "./proposition";
import { Quiz } from "./quiz";

export class QuizDTO {
    constructor(
        public quiz?: Quiz,
        public propositions: Proposition[] = []
    ) { }
}
