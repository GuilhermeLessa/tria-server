const httpsSerivce = require('./https.service');

module.exports = {
    JSONLogger: content => {
        httpsSerivce.post(
            'https://nacuyij062.execute-api.us-east-2.amazonaws.com/default/jsonLogger',
            JSON.stringify(content),
            response => {
                console.log('aws lambda json logger request success');
            },
            error => {
                console.log('aws lambda json logger request failed: ', error);
            },
            { 'Content-Type': 'application/json' }
        )
    }
}