import { Page } from 'puppeteer';

/**
 * Extracts and returns the text content of a specified HTML element on the page.
 *
 * @async
 * @function extractText
 * @param {Page} page - The Puppeteer page instance to extract data from.
 * @param {string} selector - The CSS selector of the element from which to extract text.
 * @returns {Promise<string>} - A Promise that resolves to the extracted text content of the element. 
 *                              If the element has no text content, returns an empty string.
 *
 * @description This function retrieves the inner text of the specified HTML element using the provided CSS selector. 
 * It is useful for web scraping or automated testing scenarios where the text content of a page element is required.
 *
 * @example
 * const text = await extractText(page, '.article-title'); // Extracts text content from the element with class 'article-title'
 */
export const extractText = async (page: Page, selector: string): Promise<string> => {
    return await page.$eval(selector, (element) => element.textContent || '');
};

/**
 * Extracts and returns the value of a specified attribute from an HTML element on the page.
 *
 * @async
 * @function extractAttribute
 * @param {Page} page - The Puppeteer page instance to extract data from.
 * @param {string} selector - The CSS selector of the element from which to extract the attribute.
 * @param {string} attribute - The name of the attribute to extract.
 * @returns {Promise<string | null>} - A Promise that resolves to the value of the specified attribute,
 *                                     or null if the attribute is not present on the element.
 *
 * @description This function retrieves the value of a specified attribute from an HTML element using 
 * the provided CSS selector. Ideal for scenarios where attribute values, like URLs or IDs, are needed for web scraping.
 *
 * @example
 * const href = await extractAttribute(page, 'a#link', 'href'); // Extracts the 'href' attribute from the anchor element with id 'link'
 */
export const extractAttribute = async (page: Page, selector: string, attribute: string): Promise<string | null> => {
    return await page.$eval(selector, (element, attribute) => element.getAttribute(attribute), attribute);
};