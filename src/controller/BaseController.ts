import {Response, Request, NextFunction} from "express";
import { Repository, getRepository } from "typeorm";
import { BaseNotification } from "../entity/BaseNotification";
import { User } from "../entity/User";

 

export abstract class BaseController<T> extends BaseNotification {

    private _repository: Repository<T>;
  
    constructor(entity: any) {
      super();
      this._repository = getRepository<T>(entity);
    }
  
    async all(request: Request) {
      console.log('user', request.userAuth)
      return this._repository.find(
        {
          where:{
            deleted: false
          }
        }
      );
    }
  
    async one(request: Request) {
      return this._repository.findOne(request.params.id);
    }
  
    async save(model: any) {
  
      if (model.uid) {



        delete model['createAt']
        delete model['updateAt']
        delete model['deleted']

        let _modelInDB = await this._repository.findOne(model.uid);
        if (_modelInDB) {
          Object.assign(_modelInDB, model);
        }
      }
  
      if (this.valid())
        return this._repository.save(model);
      else
        return {
          status: 400,
          errors: this.allNotifications
        }
    }
  
    async remove(request: Request) {
      let uid = request.params.id;
      let model: any = await this._repository.findOne(uid);
      if (model) {
        model.deleted = true;
        return this._repository.save(model);
      }else{
        return{
          status:404,
          error:[
            'Item não encontrado no banco de dados'
          ]
        }
      }
      
    }

    get repository(): Repository<T>{
      return this._repository
    }
  
  }