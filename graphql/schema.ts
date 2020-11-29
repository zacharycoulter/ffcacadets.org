import { DocumentNode } from 'graphql'
import {GetControllers} from "../classes/Controller";
import { gql } from 'apollo-server-lambda'

const defaultSchema: DocumentNode = gql`
    type Query {
        default: Boolean!
    }
    type Mutation {
        default(value: Boolean): Boolean
    }
`;

const getSchemas = (): DocumentNode[] => {
    const listOfSchema: DocumentNode[] = [ defaultSchema ];

    for (const controller of GetControllers())
        if (controller.Schema) listOfSchema.push(controller.Schema);

    return listOfSchema;
}

export const schemas: DocumentNode[] = getSchemas();