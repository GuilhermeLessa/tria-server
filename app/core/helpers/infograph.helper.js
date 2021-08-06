const { parseResolveInfo } = require('graphql-parse-resolve-info');

module.exports = (info) => {
    return {
        getField: (fieldName) => {
            if (!info.fieldsByTypeName) {
                info = parseResolveInfo(info);
            }

            const _rootTypeName = Object.keys(info.fieldsByTypeName)[0];

            const field = info.fieldsByTypeName[_rootTypeName][fieldName];

            return typeof field === 'undefined' ? { isDefined: false } : { ...field, isDefined: true };
        },
        isInstrospectionQuery: () => info && info.request && info.request.operationName == 'IntrospectionQuery'
    }
};
