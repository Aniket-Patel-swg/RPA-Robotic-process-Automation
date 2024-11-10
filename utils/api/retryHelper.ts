
/**
 * Executes a given asynchronous function, retrying it upon failure up to a specified number of times.
 * This utility is particularly useful for handling transient errors in network requests or external API calls.
 *
 * @template T - The type of the resolved value from the asynchronous function.
 * @param {() => Promise<T>} fn - An asynchronous function to be executed, returning a Promise.
 * @param {number} [retries=3] - The maximum number of retry attempts. Defaults to 3.
 * @param {number} [delay=1000] - The wait time (in milliseconds) between retries. Defaults to 1000 ms.
 * 
 * @returns {Promise<T>} - Returns a Promise that resolves with the result of `fn` if successful, or throws an error if all attempts fail.
 *
 * @throws {Error} - Throws an error if the function fails after the specified number of retries.
 *
 * @example
 * const fetchData = async () => { 
 *    // Simulate an API call 
 *    if (Math.random() > 0.5) throw new Error('Random failure');
 *    return 'Data received successfully';
 * };
 * 
 * withRetry(fetchData, 5, 2000)
 *    .then((data) => console.log(data))
 *    .catch((error) => console.error(error.message));
 */
export const withRetry = async <T>(
    fn: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000
): Promise<T> => {
    let attempts = 0;

    while (attempts < retries) {
        try {
            return await fn();
        } catch (error) {
            attempts++;
            if (attempts >= retries) {
                throw new Error(`Failed after ${retries} attempts: ${error.message}`);
            }
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }

    throw new Error('This point should not be reached');
};