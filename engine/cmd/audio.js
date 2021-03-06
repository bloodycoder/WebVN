webvn.use(function (script, media) {
    // Background music
    var bgm = media.audio.get('bgm');
    /**
     * Bgm Command
     * @class webvn.cmd.BgmCommand
     * @extends webvn.script.Command
     */
    script.createCommand({

        constructor: function BgmCommand() {
            this.callSuper('bgm');
        },

        /**
         * @memberof webvn.cmd.BgmCommand
         * @property {number} duration(du) duration of fadein and fadeout
         * @property {boolean} fadeIn(fi) fade in bgm or not
         * @property {boolean} fadeOut(fo) fade out bgm or not
         * @property {boolean} loop(l) loop bgm or not
         * @property {boolean} play(p) play bgm or pause bgm
         * @property {string} src(s) load bgm and play
         * @property {boolean} stop(st) stop bgm
         * @property {number} volume(v) set volume of bgm
         */
        options: {
            duration: {
                type: 'Number',
                shortHand: 'du'
            },
            fadeIn: {
                type: 'Boolean',
                shortHand: 'fi'
            },
            fadeOut: {
                type: 'Boolean',
                shortHand: 'fo'
            },
            loop: {
                type: 'Boolean',
                shortHand: 'l'
            },
            play: {
                type: 'Boolean',
                shortHand: 'p'
            },
            src: {
                type: 'String',
                shortHand: 's'
            },
            stop: {
                type: 'Boolean',
                shortHand: 'st'
            },
            volume: {
                type: 'Number',
                shortHand: 'v'
            },
            playNext: {
                type: 'Boolean',
                shortHand: 'pn',
                defaultValue: true
            }
        },

        orders: [
            'fadeIn',
            'fadeOut',
            'duration',
            'play',
            'loop',
            'stop',
            'src',
            'playNext'
        ],

        fadeIn: function (value) {
            "use strict";
            bgm.fadeIn = value;
        },

        fadeOut: function (value) {
            "use strict";
            bgm.fadeOut = value;
        },

        duration: function (value) {
            "use strict";
            bgm.duration = value;
        },

        play: function (value) {
            "use strict";
            if (value) {
                bgm.play();
            } else {
                bgm.pause();
            }
        },

        loop: function (value) {
            "use strict";
            bgm.loop(value);
        },

        stop: function (value) {
            "use strict";
            if (value) {
                bgm.stop();
            }
        },

        src: function (value) {
            "use strict";
            bgm.load(value);
        }

    });

    /**
     * Se Command
     * @class webvn.cmd.SeCommand
     * @extends webvn.script.Command
     */
    // Sound Effect
    var se = media.audio.get('se');
    script.createCommand({

        constructor: function SeCommand() {
            this.callSuper('se');
        },

        /**
         * @memberof webvn.cmd.SeCommand
         * @property {Boolean} loop(l) loop bgm or not
         * @property {String} src(s) load bgm and play
         */
        options: {
            loop: {
                type: 'Boolean',
                shortHand: 'l'
            },
            src: {
                type: 'String',
                shortHand: 's'
            }
        },

        orders: [
            'src',
            'loop'
        ],

        src: function (value) {
            "use strict";
            se.load(value);
        },

        loop: function (value) {
            "use strict";
            se.loop(value);
        }

    });

    // Voice
    var voice = media.audio.get('voice');
    /**
     * Voice Command
     * @class webvn.cmd.VoiceCommand
     * @extends webvn.script.Command
     */
    script.createCommand({

        constructor: function VoiceCommand() {
            this.callSuper('voice');
        },

        /**
         * @memberof webvn.cmd.VoiceCommand
         * @property {Boolean} loop(l) loop bgm or not
         * @property {String} src(s) load bgm and play
         */
        options: {
            loop: {
                type: 'Boolean',
                shortHand: 'l'
            },
            src: {
                type: 'String',
                shortHand: 's'
            }
        },

        orders: [
            'src',
            'loop'
        ],

        src: function (value) {
            "use strict";
            voice.load(value);
        },

        loop: function (value) {
            "use strict";
            voice.loop(value);
        }

    });

});
