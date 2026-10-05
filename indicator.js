// SPDX-License-Identifier: GPL-2.0-or-later
//
// Generated with AI for personal use.
// Do NOT upload to extensions.gnome.org (EGO) unless you understand JavaScript
// and can maintain this code.

import Clutter from 'gi://Clutter';
import Gio from 'gi://Gio';
import GObject from 'gi://GObject';
import St from 'gi://St';

import {gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

export const TeamCrestIndicator = GObject.registerClass(
class TeamCrestIndicator extends PanelMenu.Button {
    _init(name, settings, placeholderFile, openPreferences) {
        super._init(0.5, name);

        this._settings = settings;
        this._placeholderIcon = new Gio.FileIcon({file: placeholderFile});

        this._icon = new St.Icon({style_class: 'team-crest-icon'});
        this.add_child(this._icon);

        // The menu shows the crest at a larger size
        this._largeIcon = new St.Icon({style_class: 'team-crest-large', x_align: Clutter.ActorAlign.CENTER});
        const crestItem = new PopupMenu.PopupBaseMenuItem({reactive: false, can_focus: false});
        crestItem.add_child(new St.Bin({child: this._largeIcon, x_expand: true}));
        this.menu.addMenuItem(crestItem);

        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
        this.menu.addAction(_('Choose Crest…'), openPreferences);

        this._settings.connectObject('changed::crest-path', () => this._loadCrest(), this);
        this._loadCrest();
    }

    _loadCrest() {
        const path = this._settings.get_string('crest-path');
        const gicon = path ? new Gio.FileIcon({file: Gio.File.new_for_path(path)}) : this._placeholderIcon;
        this._icon.gicon = gicon;
        this._largeIcon.gicon = gicon;
    }

    destroy() {
        this._settings.disconnectObject(this);

        this._settings = null;
        this._placeholderIcon = null;
        this._icon = null;
        this._largeIcon = null;

        super.destroy();
    }
});
