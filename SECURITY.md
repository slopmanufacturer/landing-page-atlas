# Security policy

## What this repository is

Landing Page Atlas is a static catalogue. It has no server, no build step, no
package manager, and no runtime dependencies. Every page is plain HTML, CSS,
and JavaScript, served by GitHub Pages. There are no cookies, no analytics, no
third-party scripts, and no forms that submit anywhere.

That removes most of the usual attack surface. The parts that remain are:

- the JavaScript in each `designs/*/script.js` and in the gallery,
- the Python checker in `tools/check_designs.py`,
- the GitHub Actions workflow in `.github/workflows/`,
- links out to other sites.

## Reporting a problem

If you find a security issue — a script injection, a link to a compromised
host, a workflow that exposes a secret, or anything that could harm someone
who opens a page — report it privately through GitHub:

<https://github.com/vezeqs/landing-page-atlas/security/advisories/new>

Please do not open a public issue for a security report. Include the page or
file, the browser, and the steps to reproduce.

## Scope

In scope:

- Cross-site scripting or injection in any page in this repository.
- A dependency or action that pulls in untrusted code.
- Content that impersonates a real organisation. Every brand here is
  fictional; if one is not, that is a bug worth reporting.

Out of scope:

- Missing security headers on GitHub Pages. The hosting is not ours to
  configure.
- Reports that require the visitor to install something first.
- Automated scanner output with no reproduction steps.

## Supported versions

The live site tracks `main`. Fixes land there; there are no maintained
branches.
