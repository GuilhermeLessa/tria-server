const AWS = require('aws-sdk'), s3 = new AWS.S3();

exports.handler = async (event) => {

    try {
        const upload = await s3.upload({
            Bucket: 'json-logger-bucket',
            Key: `log_${(new Date()).getTime()}.json`,
            Body: JSON.stringify(event)
        }).promise();
        console.log('Write log file success: ', upload);
        return { success: true };
    } catch (e) {
        console.log('Write log file error: ', e);
        return { success: false };
    }

};
