import {Router} from "express";
import {Controller, GetControllers} from "../classes/Controller";

const getRouter = (): Router => {
    const router = Router();

    for (const controller of GetControllers())
        if (controller.Path && controller.Methods) {
            if (controller.Methods.GET) router.get(controller.Path, controller.Methods.GET);
            if (controller.Methods.POST) router.post(controller.Path, controller.Methods.POST);
            if (controller.Methods.PUT) router.put(controller.Path, controller.Methods.PUT);
            if (controller.Methods.DELETE) router.delete(controller.Path, controller.Methods.DELETE);
        }

    return router;
}

export const router: Router = getRouter();


