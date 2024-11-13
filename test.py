from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service  # Import Service
from selenium.webdriver.chrome.options import Options  # Optional for configuring Chrome options
import time

# Start time
start_time = time.time()

# Set up your WebDriver
chrome_driver_path = "C:/Users/Aniket Patel/Downloads/ChromeSetup (1).exe"
service = Service(chrome_driver_path)

chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in headless mode if needed
chrome_options.add_argument("--disable-gpu") 

driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    # Navigate to the Aadhaar-PAN linking status page
    driver.get("https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status")

    # Wait for the page to load completely
    time.sleep(5)

    # Find the PAN input field and enter the PAN number
    pan_input = driver.find_element(By.ID, "mat-input-0")
    pan_number = "HEUPM4887J"  # Replace with the actual PAN number
    pan_input.send_keys(pan_number)

    # Find the Aadhaar input field and enter the Aadhaar number
    aadhaar_input = driver.find_element(By.ID, "mat-input-1")
    aadhaar_number = "873771425172"  # Replace with the actual Aadhaar number
    aadhaar_input.send_keys(aadhaar_number)

    # Submit the form
    aadhaar_input.send_keys(Keys.RETURN)

    # Wait for the results to load
    time.sleep(5)

    # Capture and print the result message (adjust the selector as needed)
    result_message = driver.find_element(By.CSS_SELECTOR, "css-selector-for-result-message").text
    print("Link Status:", result_message)

finally:
    # Close the browser
    driver.quit()

# End time
end_time = time.time()

# Print the time taken
print("Time taken to run the script:", end_time - start_time, "seconds")
