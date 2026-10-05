// SPDX-License-Identifier: GPL-2.0-or-later
//
// Generated with AI for personal use.
// Do NOT upload to extensions.gnome.org (EGO) unless you understand JavaScript
// and can maintain this code.

import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';

import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

// A catalog of football crests, suggested to the user; the extension never downloads from it
const CRESTS_SITE_NAME = 'Escudoteca — paladarnegro.net';
const CRESTS_SITE_URL = 'https://paladarnegro.net/escudoteca/index.html';

export default class TeamCrestPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup({
            title: _('Your Team'),
            description: _('Download the crest of your football team and choose the image here. PNG or SVG with a transparent background looks best.'),
        });
        page.add(group);
        window.add(page);

        const row = new Adw.ActionRow({title: _('Crest')});
        group.add(row);

        const preview = new Gtk.Image({pixel_size: 48});
        row.add_prefix(preview);

        const removeButton = new Gtk.Button({
            label: _('Remove'),
            valign: Gtk.Align.CENTER,
        });
        row.add_suffix(removeButton);

        const chooseButton = new Gtk.Button({
            label: _('Choose…'),
            valign: Gtk.Align.CENTER,
            css_classes: ['suggested-action'],
        });
        row.add_suffix(chooseButton);

        const update = () => {
            const path = settings.get_string('crest-path');
            if (path)
                preview.set_from_file(path);
            else
                preview.set_from_file(this.dir.get_child('icons').get_child('crest-symbolic.svg').get_path());
            row.subtitle = path ? Gio.File.new_for_path(path).get_basename() : _('No crest chosen');
            removeButton.sensitive = path !== '';
        };
        settings.connect('changed::crest-path', update);
        update();

        const siteRow = new Adw.ActionRow({
            title: _('Where to Find Crests'),
            subtitle: CRESTS_SITE_NAME,
            activatable: true,
        });
        siteRow.add_suffix(new Gtk.Image({icon_name: 'adw-external-link-symbolic'}));
        siteRow.connect('activated', () => new Gtk.UriLauncher({uri: CRESTS_SITE_URL}).launch(window, null, null));
        group.add(siteRow);

        removeButton.connect('clicked', () => settings.reset('crest-path'));
        chooseButton.connect('clicked', () => this._chooseCrest(window, settings));
    }

    _chooseCrest(window, settings) {
        const filter = new Gtk.FileFilter({name: _('Images')});
        filter.add_pixbuf_formats();
        const filters = new Gio.ListStore({item_type: Gtk.FileFilter});
        filters.append(filter);

        const dialog = new Gtk.FileDialog({title: _('Choose a Crest Image'), filters});
        dialog.open(window, null, (_dialog, result) => {
            let file;
            try {
                file = dialog.open_finish(result);
            } catch (e) {
                // Closing the dialog without choosing a file is not an error
                if (!e.matches(Gtk.DialogError, Gtk.DialogError.DISMISSED))
                    logError(e);
                return;
            }
            settings.set_string('crest-path', file.get_path());
        });
    }
}
