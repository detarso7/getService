import { Request } from "express";
import { QuestionType } from "../entity/enum/QuestionType";
import { Question } from "../entity/Question";
import { BaseController } from "./BaseController"

export class QuestionController extends BaseController<Question>{
    constructor(){
        super(Question)
    }

    async save(request: Request) {
        let _question = <Question>request.body;
        super.isRequired(_question.question, 'A pergunta é obrigatória');
        super.isRequired(_question.type, 'O tipo da pergunta é obrigatório');
        super.isRequired(_question.subCategory, 'Informe a sub categoria da pergunta');


        if ( _question.type && parseInt(_question.type.toString()) === QuestionType.Select)

        super.isRequired(_question.options, 'Para o tipo selecionado, você deve informar quais são as opões')

        return super.save(_question);
    }

}