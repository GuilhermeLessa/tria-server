const awsLambdaService = require('../awsLambda.service');

module.exports = {
    log: (message, info, saveLog = false) => {
        console.log(message);
        if (saveLog) {
            awsLambdaService.JSONLogger({ message, info });
        }
    }
};
