import type {
    APIEmpty,
    APIPagination,
    APIParameter,
    APIQuery
} from "./system";
import type {
    SubscribeEntity, SubscribeExtendEntity,
    SubscribeStatusEntity

} from "~/api/entities";


/*
* Structure
*
* "*" before name param - required
* "?" after name param - optional
* "body" - only routes with body
*
* {METHOD}: {
*   {ROUTE PATH}: {
*       * response: {TYPE};
*       query?: { {QUERY KEY}: VALUE };
*       params?: { {PARAM KEY}: VALUE };
*       body?: { {DATA KEY}: VALUE };
*   };
* };
* */
export type APIRoutes = {
    POST: {
        'mails/subscribe': {
            response: SubscribeStatusEntity;
            body: SubscribeEntity;
        };
        'mails/subscribe-verify': {
            response: SubscribeStatusEntity;
            body: SubscribeExtendEntity;
        };
        'mails/unsubscribe': {
            response: SubscribeStatusEntity;
            body: SubscribeExtendEntity;
        };
    };
}
