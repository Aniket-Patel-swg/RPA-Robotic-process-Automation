import { Page } from 'puppeteer';

/**
 * Clicks on a specified element within a Puppeteer page after waiting for it to appear.
 *
 * @async
 * @function clickElement
 * @param {Page} page - The Puppeteer page instance on which the element is located.
 * @param {string} selector - The CSS selector for the target element.
 * @param {number} [waitTime=3000] - Maximum wait time (in milliseconds) to locate the element. Default is 3000ms.
 * @returns {Promise<void>} - A Promise that resolves once the click action is performed.
 *
 * @description This function helps to interact with web elements by waiting for the target element
 * to be available within the specified time, then simulating a click action on the element.
 * This utility is commonly used in automation workflows where an element's presence is not immediate.
 *
 * @example
 * await clickElement(page, '#submit-button');
 */
export const clickElement = async (page: Page, selector: string, waitTime: number = 3000): Promise<void> => {
    await page.waitForSelector(selector, { timeout: waitTime });
    await page.click(selector);
};

/**
 * Types text into a specified input element within a Puppeteer page after waiting for it to appear.
 *
 * @async
 * @function typeIntoElement
 * @param {Page} page - The Puppeteer page instance on which the element is located.
 * @param {string} selector - The CSS selector for the target input element.
 * @param {string} text - The text to be typed into the input element.
 * @param {number} [waitTime=3000] - Maximum wait time (in milliseconds) to locate the element. Default is 3000ms.
 * @returns {Promise<void>} - A Promise that resolves once the text is typed into the element.
 *
 * @description This function waits for an input element to appear, then types the specified text
 * into it. This is useful for automating form filling and text input in web-based applications.
 *
 * @example
 * await typeIntoElement(page, '#username', 'myUser123');
 */
export const typeIntoElement = async (page: Page, selector: string, text: string, waitTime: number = 3000): Promise<void> => {
    await page.waitForSelector(selector, { timeout: waitTime });
    await page.type(selector, text);
};
