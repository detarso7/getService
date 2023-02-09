import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import config from "./configuration/config"
import auth from "./middlaware/auth";

  // create express app
  const app = express();
  app.use(bodyParser.json());
  app.use(auth)

  // register express routes from defined application routes
  Routes.forEach(route => {
      (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
          const result = (new (route.controller as any))[route.action](req, res, next);
          if (result instanceof Promise) {
             // result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            result.then( d => {
                if (d && d.status)
                res.status(d.status).send(d.massage || d.errors);
                else
                res.json(d);
            }

            )
          
            } else if (result !== null && result !== undefined) {
              res.json(result);
          }
      });
  });

  app.listen(config.port, '0.0.0.0', async ()=>{
        console.log(`Api inicializada na porta ${config.port}`);

        try {
            await createConnection();
            console.log(`Database conected`);
            
        } catch (error) {
            console.log('Data base no conected', error);
        }

  })