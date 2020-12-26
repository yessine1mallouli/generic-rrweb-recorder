const { logger } = require('./util');
test('should print something for logging purposes',() => {
    const text = logger("hope its correct");
    expect(text).toBe("generic-rrweb-recorder: hope its correct");
});