# Local Fonts (fallback)

The UI currently loads **Cinzel** and **Cormorant Garamond** from Google Fonts via
the `@import` at the top of `stylesheet.css`. That's fine for development and for
any build that will run with an internet connection.

If you want the game to work fully offline (no CDN dependency), drop the following
files into this folder and swap the `@import` in `stylesheet.css` for local
`@font-face` declarations:

- Cinzel-Regular.woff2
- Cinzel-Bold.woff2
- CormorantGaramond-Regular.woff2
- CormorantGaramond-Italic.woff2
- CormorantGaramond-SemiBold.woff2

Both families are open-source (SIL Open Font License) and can be downloaded from
Google Fonts: https://fonts.google.com/specimen/Cinzel and
https://fonts.google.com/specimen/Cormorant+Garamond

This file itself is not compiled into the story   tweego only picks up `.tw`,
`.css`, and `.js` files from `src/`.
