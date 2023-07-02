/**
 * Invokes passed in callback function after specified number of seconds (1 sec by default)
 *
 * @param {Function} callback - The callback function to be called, accepts data object
 * @param {{}} dataObj - data to pass into the callback (empty by default)
 * @param {number} waitTimeSec - Number of seconds to wait before invoking the function
 * @returns {void}
 */
export function invokeCallback(
    callback: (data: any) => void,
    dataObj = {},
    waitTimeSec = 1,
) {
    setTimeout(() => {
        callback(dataObj);
    }, waitTimeSec * 1000);
}

/**
 * Function which returns a promise
 *
 * @param {string} resolveVale - The resolve value of the returned promise (default value is empty string)
 * @param {string} rejectMsg - The message to pass to error if promise is rejected
 * @param {number} timeoutSec - Number of seconds to wait before resolving the promise
 * @returns {Promise<string>} - A promise that resolves with a value if resolve value is not empty string. Rejects otherwise
 */
export function promiseFunc(resolveValue = "", rejectMsg = "", timeoutSec = 1) {
    return new Promise((resolve, reject) => {
        // Perform asynchronous operations
        // For example, simulate an async API call with setTimeout
        setTimeout(() => {
            if (resolveValue !== "") {
                resolve(resolveValue); // Resolve the Promise with the result value
            } else {
                reject(new Error(rejectMsg)); // Reject the Promise with an error
            }
        }, timeoutSec * 1000);
    });
}
