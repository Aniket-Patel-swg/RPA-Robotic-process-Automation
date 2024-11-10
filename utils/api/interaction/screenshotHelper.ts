import path from 'path';
import { Page } from 'puppeteer';

/**
 * Captures a full-page screenshot of the given Puppeteer page and saves it with a timestamped filename.
 *
 * @async
 * @function captureScreenshot
 * @param {Page} page - The Puppeteer page instance to capture.
 * @param {string} [name='screenshot'] - The base name for the screenshot file. Default is 'screenshot'.
 * @returns {Promise<void>} - A Promise that resolves when the screenshot is saved successfully.
 *
 * @description This function captures a full-page screenshot of the provided Puppeteer page. It saves the image 
 * as a PNG file in the `/tmp` directory, with a unique timestamp in the filename to avoid overwrites.
 * Useful for logging, debugging, or recording automation sequences in web scraping or testing environments.
 *
 * @example
 * await captureScreenshot(page, 'homepage'); // Saves screenshot as `/tmp/homepage-<timestamp>.png`
 */
export const captureScreenshot = async (page: Page, name: string = 'screenshot'): Promise<void> => {
    const filePath = path.join('/tmp', `${name}-${Date.now()}.png`);
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`Screenshot saved at ${filePath}`);
};