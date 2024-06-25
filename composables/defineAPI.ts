import {$fetch} from "ofetch";
import type {APIStruct} from "~/api/system";
import useUtils from "~/composables/useUtils";
import type {UseSwitch} from "~/composables/useSwitch";

type APIMethodsStructureBody = {
    response: any;
    params?: APIMethodsStructureData<number>;
    query?: APIMethodsStructureData<string | number>
    body?: APIMethodsStructureData;
}
type APIMethodsStructureData<T = any> = {
    [param: string]: T;
};
type APIFetchConfigParams = {
    loader?: UseSwitch | false;
    onlyOffLoader?: boolean;
    authorization?: boolean | string;
    addSlash?: boolean;
};
type APIFetchConfig<R> = APIFetchConfigParams & {
    success?: (res: R) => void;
    error?: (e: any) => void;
    finally?: () => void;
};
type APIFetchReturn<R> = Promise<R>;

function preparePath(path: string, params?: APIMethodsStructureData): string {
    const { trimStr } = useUtils();

    if (params) {
        let newPath = path;

        for (const param in params) {
            newPath = newPath.replace(`{${param}}`, params[param]);
        }

        return trimStr(newPath, '/');
    }

    return trimStr(path, '/');
}

export default function<MapOfMethods extends APIStruct>(url: string, defaultConfig?: APIFetchConfigParams) {
    const _defaultConfig: Required<APIFetchConfigParams> = {
        loader: false,
        onlyOffLoader: false,
        authorization: false,
        addSlash: false,

        ...defaultConfig
    };

    return async function<
        Method extends keyof MapOfMethods,
        Path extends keyof MapOfMethods[Method],
        Options extends Omit<MapOfMethods[Method][Path], 'response'>,
        // @ts-ignore
        Res extends MapOfMethods[Method][Path]['response']
    >(
        method: Method,
        path: Path,
        options: Options,
        config?: APIFetchConfig<Res>
    ): APIFetchReturn<Res> {
        const _config: Required<APIFetchConfig<Res>> = {
            ..._defaultConfig,

            success: () => {},
            error: () => {},
            finally: () => {},

            ...config
        };

        const typedOptions = options as Omit<APIMethodsStructureBody, 'response'>;
        const typedPath = path as string;

        if (_config.loader) _config.loader.show(!_config.onlyOffLoader);

        return new Promise((resolve, reject) => {
            $fetch<Res>(
                `${url}/${preparePath(typedPath, typedOptions.params)}${_config.addSlash ? '/' : ''}`,
                {
                    method: method as string,
                    query: typedOptions.query ?? {},
                    ...(typedOptions.body ? { body: typedOptions.body } : {}),
                }
            )
                .then(res => {
                    _config.success(res);
                    resolve(res);
                })
                .catch(e => {
                    _config.error(e);
                    reject(e);
                })
                .finally(() => {
                    if (_config?.loader) _config.loader.hide();
                    _config.finally();
                });
        });
    }
}
