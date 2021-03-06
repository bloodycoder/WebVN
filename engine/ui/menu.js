/* This ui component is also served as a template.
 * Every other components should be written in the same style.
 */
webvn.use(['ui', 'script', 'media', 'util', 'canvas', 'config', 'storage'], function (ui, script, media, util, canvas, config, storage) {
    "use strict";
    var uiName = 'menu',
        exports = ui.create(uiName, 'div'),
        $el = exports.$el,
        lang = ui.lang.get(uiName),
        tpl = ui.template.get(uiName),
        save = storage.create(uiName);

    var cfg = config.create('uiMenu'),
        cfgStartLabel = cfg.get('startLabel');

    exports.bgm = cfg.get('bgm');
    exports.btnClickSound = cfg.get('btnClkSound');
    exports.btnHoverSound = cfg.get('btnHoverSound');
    exports.duration = cfg.get('Duration');
    exports.fadeIn = cfg.get('fadeIn');
    exports.fadeOut = cfg.get('FadeOut');

    $el.addClass('fill').html(tpl({
        'Start': lang.get('Start'),
        'Load': lang.get('Load'),
        'Gallery': lang.get('Gallery'),
        'Music': lang.get('Music'),
        'Config': lang.get('Config')
    }));

    var bgm = media.audio.get('bgm'),
        sysAudio = media.audio.get('sys'),
        renderer = canvas.renderer;

    save.save(function () {
        return {};
    }).load(function () {
        $el.hide();
    });

    exports.stopPropagation().events({

        'click .start': function () {
            renderer.start();

            if (exports.bgm) bgm.stop();

            if (exports.fadeOut) {
                $el.fadeOut(exports.duration, function () {
                    script.jump(cfgStartLabel);
                });
            } else {
                $el.hide();
                script.jump(cfgStartLabel);
            }
        },

        'click .load': function () {
            ui.get('save').show('load');
        },

        'click .setting': function () {
            ui.get('config').show();
        },

        'click .cg': function () {
            ui.get('gallery').show();
        },

        'click .music': function () {
            if (exports.bgm) bgm.stop();

            ui.get('music').show();
        },

        'mouseover li': function () {
            if (exports.btnHoverSound) sysAudio.load(exports.btnHoverSound);
        },

        'click li': function () {
            if (exports.btnClickSound) sysAudio.load(exports.btnClickSound);
        }

    });

    exports.reset = function () {
        $el.hide();
    };

    exports.show = function () {
        renderer.stop();

        if (exports.bgm) bgm.load(exports.bgm);

        exports.fadeIn ? $el.fadeIn(exports.duration) : $el.show();
    };

    exports.buttons = function (buttons) {
        util.each(buttons, function (value, key) {
            var $e = $el.find('ul li.' + key);

            if (util.isString(value)) {
                $e.text(value);
                return;
            }

            value ? $e.css('display', 'block') : $e.css('display', 'none');
        });
    };

    exports.playBgm = function () {
        if (exports.bgm) bgm.load(exports.bgm);
    };

});