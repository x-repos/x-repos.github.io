# x-repos.github.io

Personal website of **Hoang Anh (Benjamin) Nguyen** — PhD researcher in geophysics at the Colorado School of Mines. Computational physics of planetary materials: quantum computing, molecular dynamics, density functional theory, Earth & planetary science.

Live at <https://x-repos.github.io/>.

## Stack

- **Jekyll** + **GitHub Pages** for static site generation.
- **Three.js** + **GSAP ScrollTrigger** for the scroll-driven homepage (qubits → DFT → MD → mantle → Earth → solar system → galaxy).
- A handful of small custom dark layouts (`_layouts/{home,blog,post,page}.html`) for the blog and one-off pages — all written from scratch.

## Local development

```bash
docker run --rm -it \
  -v "$PWD:/srv/jekyll" \
  -p 4000:4000 \
  -e JEKYLL_UID=$(id -u) -e JEKYLL_GID=$(id -g) \
  jekyll/jekyll:4 \
  jekyll serve --watch --force_polling --host 0.0.0.0
```

Then open <http://localhost:4000/>. First boot installs `github-pages` gems and takes a few minutes.

## Where things live

| What | Where |
|---|---|
| Homepage content | `_pages/home.html` |
| Homepage layout | `_layouts/home.html` |
| Homepage CSS | `assets/css/home.css` |
| Homepage WebGL / animation | `assets/js/home.js` |
| Blog index | `_pages/blog.html` |
| Blog posts | `_posts/` |
| CV (PDF) | `files/HoangAnh_CV.pdf` |
| Site config | `_config.yml` |

## License

© Hoang Anh Nguyen. All rights reserved.
