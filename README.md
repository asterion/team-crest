# Team Crest

A GNOME Shell extension that shows the crest of your football team in the top
panel. You choose the image, so it works with any team.

## How it works

- The crest sits in the top panel. Until you choose one, a plain shield is shown.
- Click the crest to see it larger.
- The menu also has **Choose Crest…**, which opens the preferences.

The extension does not include or download any crest: you pick an image file
from your computer. It is available in **English, Spanish and French**,
following your system language.

## Installation

Requires GNOME Shell 50 and `git`.

```bash
git clone https://github.com/asterion/team-crest.git \
    ~/.local/share/gnome-shell/extensions/team-crest@asterion
glib-compile-schemas ~/.local/share/gnome-shell/extensions/team-crest@asterion/schemas
```

Log out and back in, then enable it:

```bash
gnome-extensions enable team-crest@asterion
```

## Choosing your crest

1. Get an image of your team's crest. The preferences link to the
   [Escudoteca](https://paladarnegro.net/escudoteca/index.html), a catalog of
   football crests, but any image works. A PNG or SVG with a transparent
   background looks best.
2. Click the crest in the panel and choose **Choose Crest…**, or run:

   ```bash
   gnome-extensions prefs team-crest@asterion
   ```

3. Press **Choose…** and pick the image. The panel updates right away.

To go back to the plain shield, press **Remove**.

The extension remembers where the image is, it does not copy it. If you move or
delete the file, choose the crest again. Keeping it in a folder you will not
clean up, such as `~/Pictures`, avoids that.

Crests are trademarks of their clubs. Download them for your own use only.

## Uninstalling

```bash
gnome-extensions disable team-crest@asterion
rm -rf ~/.local/share/gnome-shell/extensions/team-crest@asterion
```

## License

[GPL-2.0-or-later](LICENSE). The license covers the extension, not the crests
you choose.
