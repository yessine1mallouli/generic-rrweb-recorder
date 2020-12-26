const { debugLog } = require('./recorder')
function logger(stringLog) {
	if (debugLog) {
        console.log("generic-rrweb-recorder: " + stringLog);
    }
    const text = "generic-rrweb-recorder: " + stringLog
    return text ;
}
exports.logger = logger;
