import { IQueryOptions } from "../common/query-options";

export const checkIfExists = async (_model: any, options: IQueryOptions) => {
    const { param, value } = options;
    let searchOptions: any = {};
    searchOptions[`${param}`] = {
        $regex: new RegExp(`${value}`),
        $options: 'i'
    };
    const exist = await _model.exists(searchOptions);
    return exist ? true : false;
}


