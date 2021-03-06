webvn.use(['ui', 'text', 'media', 'config', 'storage'], function (ui, text, media, config, storage) {
    "use strict";
    var uiName = 'dialog',
        exports = ui.create(uiName, 'div'),
        $el = exports.$el,
        lang = ui.lang.get(uiName),
        tpl = ui.template.get(uiName),
        save = storage.create(uiName);

    var cfg = config.create('uiDialog'),
        cfgPath = cfg.get('path'),
        cfgExtension = cfg.get('extension');

    exports.textType = cfg.get('textType');
    exports.textDuration = cfg.get('textDuration');
    exports.duration = cfg.get('duration');
    exports.fadeIn = cfg.get('fadeIn');
    exports.fadeOut = cfg.get('fadeOut');

    $el.addClass('fill').html(tpl({
        Load: lang.get('Load'),
        Save: lang.get('Save'),
        Config: lang.get('Config')
    }));

    var $content = $el.find('.content'),
        $name = $el.find('.name'),
        $face = $el.find('.face'),
        $text = $content.find('.text');

    var asset = storage.createAsset(cfgPath, cfgExtension),
        textAnim = text.createAnim($text),
        voice = media.audio.get('vo');

    save.save(function () {
        return {
            visible: $el.visible(),
            name: $name.html(),
            text: $text.html()
        };
    }).load(function (val) {
        if (val.visible) $el.show();
        $name.html(val.name);
        $text.html(val.text);
    });

    exports.events({

        'click .save': function () {
            ui.get('save').show('save');
        },

        'click .load': function () {
            ui.get('save').show('load');
        },

        'click .config': function () {
            ui.get('config').show();
        },

        'click .exit': function () {
            ui.get('menu').show();
        }

    });

    exports.show = function () {
        if ($el.visible()) return;

        exports.fadeIn ? $el.fadeIn(exports.duration) : $el.show();
    };

    exports.face = function(src) {
        !src ? $face.hide() : $face.show().attr('src', asset.get(src));
    };

    exports.hide = function () {
        exports.fadeOut ? $el.fadeOut(exports.duration) : $el.hide();
    };

    exports.name = function (name) {
        $name.html('【' + name + '】');
    };

    exports.text = function (text) {
        textAnim.type = exports.textType;
        textAnim.duration = exports.textDuration;
        textAnim.load(text);
    };

    exports.voice = function (src) {
        voice.load(src);
    };

    exports.style = function (name) {
        name === 'big' ? $el.addClass('big') : $el.removeClass('big');
    };

});