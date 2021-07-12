const { parseResolveInfo } = require('graphql-parse-resolve-info');

module.exports = (info) => {
    if (!info.fieldsByTypeName) {
        info = parseResolveInfo(info);
    }

    return {
        getField: (fieldName) => {
            const _rootTypeName = Object.keys(info.fieldsByTypeName)[0];

            const field = info.fieldsByTypeName[_rootTypeName][fieldName];

            return typeof field === 'undefined' ? { isDefined: false } : { ...field, isDefined: true };
        }
    }
};
