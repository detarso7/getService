import { Request } from "express";
import {User} from "../entity/User";
import { BaseController } from "./BaseController";
import * as md5 from 'md5'

export class UserController extends BaseController<User> {

    constructor() {
        super(User);
    }

   async createUser(request:Request) {
    let {name, photo, email, password, confirmPassword, isRoot} = request.body;
    super.isRequired(name, 'Informe o nome');
    super.isRequired(photo, 'Anexe uma foto');
    super.isRequired(email, 'Informe o e-mail');
    super.isRequired(password, 'Informe uma senha');
    super.isRequired(confirmPassword, 'Confirme a senha');


    let _user = new User()
    _user.name = name;
    _user.photo = photo;
    _user.email = email;

    if(password != confirmPassword)

    return {status: 400, errors: "As senhas estão diferentes"}


        if(password)
        _user.password = md5(password);

    _user.isRoot = isRoot;

    return super.save(_user)

   }

    async save(request: Request) {
        let _user = <User>request.body;
        super.isRequired(_user.name, 'O nome do usuário é obrigatório');
        super.isRequired(_user.photo, 'A foto do usuário é obrigatória');
        return super.save(_user);
    }

}