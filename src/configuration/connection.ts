import { createConnection } from "typeorm";
import { Category } from "../entity/Category";
import { User } from "../entity/User";
import { SubCategory } from "../entity/SubCategory";

const cfg = require('../../ormconfig.json')

export default {
    createConnection: async () =>{
        await createConnection
       ( {
            type: cfg.type ,
            host: cfg.host,
            port: cfg.port,
            username: cfg.username,
            password: cfg.password,
            database: cfg.database,
            synchronize: true,
            logging: false,
            entities: [
               User,
               Category,
               SubCategory
            ]
        })
        console.log('Banco conectado!')
    }
}