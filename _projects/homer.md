---
title: Homer
kind: Windows loader research
year: "2026"
description: A fork of Donut that resists static extraction, through handrolled PEB editing and other techniques, drastically complicating static and dynamic analysis.
stack: C, PE/COFF, Windows internals
featured: false
link_label: Repository
link: https://github.com/pwn2nice/homer
cv: false
cv_meta: C, Windows internals.
cv_bullets:
  - Generates position-independent shellcode that loads PE payloads from memory on Windows. The manual mapper registers a full LDR_DATA_TABLE_ENTRY in the PEB. 83 stars, 7 forks.
  - Import-name scrubbing after binding, and unhooking through KnownDlls and SEC_IMAGE mapping.
---
