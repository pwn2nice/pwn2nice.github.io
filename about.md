---
layout: page
title: About
description: Security researcher. iOS kernel and app-layer security, exploit development, and the tooling around both.
permalink: /about/
wide: true
---
<div class="about-grid">
  <section class="about-left" aria-label="Profile">
    <h2>Profile</h2>
    <p>I'm Yasser (pwn2nice). I work on mobile vulnerability research: iOS kernel and app-layer bugs, from JavaScript engine sandbox escapes to RCEs via logic bugs. I wrote Homer and cb-exec, did adversarial testing for Google DeepMind, and placed in the Hack The Box top 1000. I have always had an interest in applied cybersecurity and study it academically, too.</p>

    <h2>Skills</h2>
    <dl class="cv-skills">
      <dt>Mobile and iOS</dt>
      <dd>ARM64, XNU kernelcache, iBoot, sandbox escapes, heap grooming, out-of-bounds read/write primitives, crash triage, TxM, PAC, CodeSign, AMI...</dd>
      <dt>Vulnerability research</dt>
      <dd>Root-cause analysis, PoC development, write-ups, CVSS scoring, exploit-path analysis. CVE-2026-109618 and CVE-2026-109619 (php2shell RCE)</dd>
      <dt>Languages</dt>
      <dd>C, Python, ARM64 assembly, JavaScript, HTML, Go, Rust, x86-64 assembly (reading)</dd>
      <dt>Reverse engineering</dt>
      <dd>Stripped Mach-O and kernelcache binaries, PE, XNU kernel, ARM64 binaries, offset derivation, debugging, QuickJS and V8 engine internals</dd>
      <dt>Windows internals</dt>
      <dd>NT loader, namespaces, syscalls, API-set redirection, C2 agents, position-independent shellcode, manual PE mapping, EDR evasion, unhooking</dd>
      <dt>Engineering</dt>
      <dd>Git, CI/CD, automated tests, code maintainability</dd>
    </dl>

    <h2>Elsewhere</h2>
    <ul class="about-links">
      <li><a href="mailto:{{ site.email }}">{{ site.email }}</a></li>
      <li><a href="https://github.com/{{ site.github_username }}">github.com/{{ site.github_username }}</a></li>
      <li><a href="https://x.com/pwn2nice">x.com/pwn2nice</a></li>
      <li><a href="{{ '/feed.xml' | relative_url }}">RSS</a></li>
    </ul>
  </section>

  <section class="about-right" aria-label="Projects and publications">
    <h2>Projects</h2>
    {% assign cv_projects = site.projects | where: 'cv', true | sort_natural: 'title' %}
    {% for project in cv_projects %}
    <h3>{{ project.title | escape }}</h3>
    <p class="cv-meta">{{ project.cv_meta | escape }}</p>
    <ul>
      {% for bullet in project.cv_bullets %}
      <li>{{ bullet | escape }}</li>
      {% endfor %}
    </ul>
    {% endfor %}

    <h2>Publications</h2>
    <ul>
      <li>Paged Out!: "Windows Namespaces: Lost Story."</li>
      <li>Paged Out!: "Windows Sockets: Good, Bad, Very Ugly."</li>
    </ul>

    <h2>Study</h2>
    <ul>
      <li>Self-directed: CARTP, CRTE, CELMS, AD-RTS. Azure and Active Directory red-team coursework.</li>
      <li>Education: Graduated in computer science, mathematics, chemistry and English.</li>
      <li>Languages: French (native), English (Cambridge B2+), Mandarin (learning).</li>
    </ul>
  </section>
</div>
