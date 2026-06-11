# GitHub Pages Deployment Plan for prodgtm.com

## Recommended Path

Use GitHub Pages with a simple branch-based deployment. This site is plain HTML, CSS, JS, and SVG, so it does not need a build step.

GitHub Pages publishes static files from a configured source and looks for `index.html` at the top level of that source. This folder already has that file.

## Files Already Prepared

- `index.html`: page entry point.
- `styles.css`: visual styling.
- `script.js`: small interaction layer.
- `prodgtm-logo.svg`: logo and favicon source.
- `CNAME`: custom domain set to `prodgtm.com`.
- `.nojekyll`: disables Jekyll processing for a pure static deploy.

## Option 1: New Repository for the Site

Best if this website should be its own clean repo.

1. Create a GitHub repository, for example `prodgtm-site`.
2. Copy all files from this folder into the repository root.
3. Commit and push to the `main` branch.
4. In GitHub, open the repository settings.
5. Go to `Pages`.
6. Set the source to `Deploy from a branch`.
7. Select branch `main` and folder `/root`.
8. Save.
9. Wait for GitHub Pages to publish.

The temporary GitHub URL will be:

`https://<github-username>.github.io/prodgtm-site/`

## Option 2: User Site Repository

Best if `prodgtm.com` should map cleanly to one GitHub Pages site without a project path.

1. Create a repository named `<github-username>.github.io`.
2. Copy all files from this folder into the repository root.
3. Commit and push to the `main` branch.
4. Enable GitHub Pages from `main` / `/root` if it is not already active.
5. Keep the `CNAME` file set to `prodgtm.com`.

The default GitHub URL will be:

`https://<github-username>.github.io/`

## Option 3: GitHub Actions

Use this only if the site later moves to Next.js, Astro, or another build tool.

For the current static version, GitHub Actions is unnecessary. If a build step is added later, configure Pages to deploy from a GitHub Actions artifact that contains `index.html` at the artifact root.

## DNS for prodgtm.com

In the GitHub repository:

1. Go to `Settings` -> `Pages`.
2. Under `Custom domain`, enter `prodgtm.com`.
3. Save.
4. Enable `Enforce HTTPS` once GitHub allows it.

At the DNS provider for `prodgtm.com`, configure the apex/root domain:

```text
Type  Name  Value
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

Optional IPv6 records:

```text
Type   Name  Value
AAAA   @     2606:50c0:8000::153
AAAA   @     2606:50c0:8001::153
AAAA   @     2606:50c0:8002::153
AAAA   @     2606:50c0:8003::153
```

For `www.prodgtm.com`, add:

```text
Type   Name  Value
CNAME  www   <github-username>.github.io
```

Do not include the repository name in the `www` CNAME target.

## Verification

After DNS changes:

```bash
dig prodgtm.com +noall +answer -t A
dig www.prodgtm.com +nostats +nocomments +nocmd
```

GitHub notes DNS changes can take up to 24 hours to propagate. Pages publishing can take several minutes after a push.

## Current Recommendation

Use Option 2 if this GitHub account will host only ProdGTM on GitHub Pages. Use Option 1 if you prefer a separate named repository and do not mind GitHub's default project URL before the custom domain is active.
