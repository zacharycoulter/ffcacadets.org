import {GetControllers} from "../classes/Controller";
import {IResolvers} from 'apollo-server-lambda';

const defaultResolvers: IResolvers = {
    Query: {
        default: () => true
    },
    Mutation: {
        default: (_, { value }, { dataSources }) => value
    }
}

const getResolvers = (): IResolvers => {
    const listOfResolvers: IResolvers = defaultResolvers;

    for (const controller of GetControllers())
        if (controller.Resolvers) {
            for(const key of ['Query', 'Mutation']) {
                if (listOfResolvers[key] && controller.Resolvers[key]) {
                    for (const resolver in controller.Resolvers[key])
                        listOfResolvers[key][resolver] = controller.Resolvers[key][resolver];

                    delete controller.Resolvers[key];
                } else if (!listOfResolvers[key] && controller.Resolvers[key])
                    listOfResolvers[key] = controller.Resolvers[key];
            }

            for(const resolver in controller.Resolvers)
                listOfResolvers[resolver] = controller.Resolvers[resolver];
        }

    return listOfResolvers;
}

export const resolvers: IResolvers = getResolvers();