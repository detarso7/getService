import { Request } from "express";
import { SubCategory } from "../entity/SubCategory"
import { BaseController } from "./BaseController"

export class SubCategoryController extends BaseController<SubCategory>{
    constructor(){
        super(SubCategory)
    }
//Validação
    async save(request: Request) {
        let _subCategory = <SubCategory>request.body;
        super.isRequired(_subCategory.name, 'O nome da sub-categoria é obrigatório');
        super.isRequired(_subCategory.category, 'A categoria é obrigatório');
        super.isRequired(_subCategory.cost, 'O custo é obrigatório');
        super.isTrue(isNaN(_subCategory.cost), 'O custo deve ser um numero')
        super.isTrue(_subCategory.cost <= 0, 'O custo precisa ser maior que zero (0)')
        return super.save(_subCategory);
    }

}