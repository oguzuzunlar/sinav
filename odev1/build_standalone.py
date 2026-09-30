# -*- coding: utf-8 -*-
"""
Bundle odev1 into a 100% standalone, self-contained single HTML file for WhatsApp
Embeds style.css, questions_data.js, and app.js into Sokratik_Odev_Tek_Dosya.html
"""

import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

base_dir = os.path.abspath('odev1')

with open(os.path.join(base_dir, 'index.html'), 'r', encoding='utf-8') as f:
    html = f.read()

with open(os.path.join(base_dir, 'style.css'), 'r', encoding='utf-8') as f:
    css = f.read()

with open(os.path.join(base_dir, 'questions_data.js'), 'r', encoding='utf-8') as f:
    questions_js = f.read()

with open(os.path.join(base_dir, 'app.js'), 'r', encoding='utf-8') as f:
    app_js = f.read()

# Replace <link rel="stylesheet" href="style.css"> with <style>...</style>
html = html.replace('<link rel="stylesheet" href="style.css">', f'<style>\n{css}\n</style>')

# Replace external scripts with inline <script>
script_tags = """  <script src="questions_data.js"></script>
  <script src="app.js"></script>"""

inline_scripts = f"""  <script>
{questions_js}
  </script>
  <script>
{app_js}
  </script>"""

html = html.replace(script_tags, inline_scripts)

# Save standalone file
output_path = os.path.join(base_dir, 'Sokratik_Odev_Tek_Dosya.html')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Standalone single-file successfully generated: {output_path}")
print(f"File size: {os.path.getsize(output_path)} bytes")
