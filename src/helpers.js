function removeUndefinedAndEmpty(obj){
    Object.entries(obj).forEach(([key, value]) => {
        if (value === undefined) delete obj[key];
        if (Array.isArray(value) && value.length === 0) delete obj[key];
        if (typeof(value) === 'object'){
            removeUndefinedAndEmpty(value);
            if (Object.keys(value).length === 0) delete obj[key];
        };
    });
    return obj;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    removeUndefinedAndEmpty,
    sleep
}