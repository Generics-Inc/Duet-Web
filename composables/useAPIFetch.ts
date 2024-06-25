import type { APIRoutes } from "~/api";

export default defineAPI<APIRoutes>(useRuntimeConfig().public.serverOrigin, {
    addSlash: false
});
