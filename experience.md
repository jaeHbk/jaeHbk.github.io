---
layout: single
title: Experience
permalink: /experience/
---

## Experience

{% for item in site.data.experience %}
### {{ item.company }}
*{{ item.position }}*, {{ item.duration }}

{{ item.description }}
{% endfor %}
