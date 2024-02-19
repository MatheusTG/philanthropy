# This template tag is needed for production
# Add it to one of your django apps 
# (/appdir/templatetags/render_vite_bundle.py, for example)

import os
import json

from django import template
from django.conf import settings
from django.utils.safestring import mark_safe

register = template.Library()


@register.simple_tag
def render_vite_bundle():
  """
  Template tag to render a vite bundle.
  Supposed to only be used in production.
  For development, see other files.
  """
  try:
    fd = open(f"{settings.VITE_APP_DIR}/dist/.vite/manifest.json", "r")
    manifest = json.load(fd)
  except:
    raise Exception(
      f"Vite manifest file not found or invalid. Maybe your {settings.VITE_APP_DIR}/dist/manifest.json file is empty?"
    )
  finally:
    fd.close()

  imports_files = ''
  for file in manifest:
    for extension in ['.jpg', '.png', '.svg', '.ico']:
      if extension in file:
        break
    else:
      imports_files += f'<script type="module" src="/static/{manifest[file]["file"]}"></script>'

  if 'css' in manifest['index.html']:
    css_file_name = manifest['index.html']['css'][0]
    imports_files += f'''
      <script>
        const head = document.querySelector("head")
        head.innerHTML += '<link rel="stylesheet" href="/static/{css_file_name}" />'
      </script>'''

  return mark_safe(
    f"""
      {imports_files}
    """
    )
