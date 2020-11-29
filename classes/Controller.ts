import {Handler} from "express";
import {DocumentNode} from "graphql";
import {IResolvers,gql} from 'apollo-server-lambda'
import * as fs from 'fs';

export const GetControllers = (): Controller[] => {
    const controllers: Controller[] = [];

    for (const file of fs.readdirSync(__dirname + '/../controllers/')) {
        const imported: Controller = require(__dirname + '/../controllers/' + file).default;
        controllers.push(new Controller(imported));
    }

    return controllers;
}

export interface Methods {
    GET: Handler,
    POST: Handler,
    PUT: Handler,
    DELETE: Handler,
}

export class Controller {
    Name: string
    Path: string
    Methods: Methods
    Schema: DocumentNode
    Resolvers: IResolvers

    constructor(defaults: Object) {
        if (!defaults['name']) throw new Error(`Controller class needs a name!`);
        if (!defaults['path']) throw new Error(`Controller class needs a path!`);
        if (!defaults['methods']) throw new Error(`Controller class needs methods!`);
        if (!defaults['schema']) throw new Error(`Controller class needs a schema!`);
        if (!defaults['resolvers']) throw new Error(`Controller class needs resolvers!`);

        this.Name = defaults['name'];
        this.Path = defaults['path'];
        this.Methods = defaults['methods'];
        this.Schema = gql`${defaults['schema']}`;
        this.Resolvers = defaults['resolvers'];
    }
}