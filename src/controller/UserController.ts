import { Request } from "express";
import {User} from "../entity/User";
import { BaseController } from "./BaseController";
import {sign} from 'jsonwebtoken'
import config from "../configuration/config";
import * as md5 from 'md5'


export class UserController extends BaseController<User> {

    constructor() {
        super(User);
    }

    async auth(request: Request) {

        //-----------------------------------------
        console.log('auth function called'); // adiciona este log
        //-----------------------------------------

        let { email, password } = request.body;

        //-----------------------------------------
        console.log('email:', email); // adiciona este log
        console.log('password:', password); // adiciona este log
        //-----------------------------------------

        if (!email || !password)
            return { status: 400, message: 'Informe o email e a senha para efetuar o login' };

        //-----------------------------------------
        let passwordMd5 = password;//log
        console.log('password MD5:', passwordMd5); // log
        //-----------------------------------------

        let user = await this.repository.findOne({ email: email, password: md5(password) });

        //-----------------------------------------
        console.log('body do user', user); // log
        //-----------------------------------------

        if (user) {
            
            let _payload = {
                uid: user.uid,
                name: user.name,
                photo: user.photo,
                email: user.email
            }; 

            //-----------------------------------------
            console.log('body do user', _payload); // log
            //-----------------------------------------
        
            console.log
            ( {   status: 200,
                message: {
                    user: _payload,
                    token: sign({
                        ..._payload, 
                        tm: new Date().getTime()
                    }, config.secretyKey,)
                },
                
            })
            console.log('body do user', request ); // log
        } else
            return { status: 404, message: 'E-mail ou senha inválidos' }
            
    }

    async createUser(request: Request) {
        let { name, photo, email, password, confirmPassword, isRoot } = request.body;
        super.isRequired(name, 'Informe o nome');
        super.isRequired(photo, 'Informe a foto');
        super.isRequired(email, 'Informe o e-mail');
        super.isRequired(password, 'Informe a senha');
        super.isRequired(confirmPassword, 'Informe a confirmação da senha');

        let _user = new User();
        _user.name = name;
        _user.photo = photo;
        _user.email = email;

        if (password != confirmPassword)
            return { status: 400, errors: ['A senha e a confirmação são diferente'] }

        if (password)
            _user.password = md5(password);

        _user.isRoot = isRoot;

        return super.save(_user);
    }

    async save(request: Request) {
        let _user = <User>request.body;
        super.isRequired(_user.name, 'O nome do usuário é obrigatório');
        super.isRequired(_user.photo, 'A foto do usuário é obrigatória');
        return super.save(_user);
    }

}