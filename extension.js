// SPDX-License-Identifier: GPL-2.0-or-later
//
// Generated with AI for personal use.
// Do NOT upload to extensions.gnome.org (EGO) unless you understand JavaScript
// and can maintain this code.
//
// Team Crest: shows the crest of the user's football team in the top panel.

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import {TeamCrestIndicator} from './indicator.js';

export default class TeamCrestExtension extends Extension {
    enable() {
        this._settings = this.getSettings();
        this._indicator = new TeamCrestIndicator(this.metadata.name, this._settings,
            this.dir.get_child('icons').get_child('crest-symbolic.svg'), () => this.openPreferences());
        Main.panel.addToStatusArea(this.uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
        this._settings = null;
    }
}
