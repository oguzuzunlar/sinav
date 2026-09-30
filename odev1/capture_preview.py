# -*- coding: utf-8 -*-
from playwright.sync_api import sync_playwright
import os, sys

sys.stdout.reconfigure(encoding='utf-8')

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 390, 'height': 800})
    page.goto('file:///' + os.path.abspath('odev1/index.html').replace(os.sep, '/'))
    page.wait_for_timeout(1000)
    page.screenshot(path='odev1/mobile_buttons_preview.png')
    
    # Test clicking Test 2
    page.click("button[data-filter='quiz-2']")
    page.wait_for_timeout(500)
    page.screenshot(path='odev1/mobile_test2_clicked.png')
    
    browser.close()

print('Screenshots saved successfully')
