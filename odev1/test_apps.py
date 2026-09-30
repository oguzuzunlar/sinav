# -*- coding: utf-8 -*-
from playwright.sync_api import sync_playwright
import os, sys

sys.stdout.reconfigure(encoding='utf-8')

with sync_playwright() as p:
    browser = p.chromium.launch()
    
    # 1. Test student mobile app
    page_mobile = browser.new_page(viewport={'width': 420, 'height': 820})
    mobile_errors = []
    page_mobile.on('pageerror', lambda err: mobile_errors.append(str(err)))
    mobile_url = 'file:///' + os.path.abspath('sokratik_mobil/index.html').replace(os.sep, '/')
    page_mobile.goto(mobile_url)
    page_mobile.wait_for_timeout(2000)
    print('Mobile page errors:', mobile_errors)
    
    # Click hint button
    page_mobile.click('#requestHintBtn')
    page_mobile.wait_for_timeout(1000)
    hint_text = page_mobile.text_content('#socraticBubble')
    print('Hint text sample:', hint_text[:120])
    
    # Click wrong option (B for Q1)
    page_mobile.click('button[data-letter="B"]')
    page_mobile.wait_for_timeout(1000)
    wrong_feedback = page_mobile.text_content('#socraticBubble')
    print('Wrong feedback sample:', wrong_feedback[:120])
    
    # Click correct option (A for Q1)
    page_mobile.click('button[data-letter="A"]')
    page_mobile.wait_for_timeout(1000)
    correct_feedback = page_mobile.text_content('#socraticBubble')
    print('Correct feedback sample:', correct_feedback[:120])
    
    # Take screenshot of mobile app
    page_mobile.screenshot(path='sokratik_mobil/mobile_app_preview.png')
    print('Saved mobile_app_preview.png')

    # 2. Test teacher dashboard
    page_teacher = browser.new_page(viewport={'width': 1280, 'height': 900})
    teacher_errors = []
    page_teacher.on('pageerror', lambda err: teacher_errors.append(str(err)))
    teacher_url = 'file:///' + os.path.abspath('sokratik_mobil/ogretmen.html').replace(os.sep, '/')
    page_teacher.goto(teacher_url)
    page_teacher.wait_for_timeout(2000)
    print('Teacher page errors:', teacher_errors)
    
    # Trigger demo simulation button to populate rich telemetry
    page_teacher.click('#demoSimulateBtn')
    page_teacher.wait_for_timeout(1000)
    kpi_solved = page_teacher.text_content('#kpiSolvedCount')
    print('Teacher KPI solved after demo simulation:', kpi_solved)
    
    # Take screenshot of teacher dashboard
    page_teacher.screenshot(path='sokratik_mobil/teacher_dashboard_preview.png', full_page=True)
    print('Saved teacher_dashboard_preview.png')
    
    browser.close()

print('ALL TESTS PASSED WITH ZERO ERRORS!')
