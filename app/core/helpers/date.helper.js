module.exports = {
    toDate: (timestamp) => (new Date(timestamp)),
    toString: (date) => date.toISOString().replace('T', ' ').slice(0, 19)
};
