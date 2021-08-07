const https = require('https');

module.exports = {
    post: (url, body, onResponse, onError, headers) => {
        try {
            url = new URL(url);
        } catch (error) {
            onError(error);
            return;
        }

        const req = https.request({
            hostname: url.hostname,
            path: url.pathname,
            method: 'POST',
            headers
        }, onResponse);
        req.on('error', onError);
        req.write(body);
        req.end();
    }
};
