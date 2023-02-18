odoo.define('odoo_exercise.extend_widget', function (require) {

    "use strict";
    var FieldOne2Many = require('web.relational_fields').FieldOne2Many;
    var PivotRenderer = require('web.PivotRenderer');
    var config = require('web.config');
    var fieldRegistry = require('web.field_registry');
    var GraphRenderer = require('web.GraphRenderer');

    var One2ManyPivotRenderer = PivotRenderer.extend({

        init: function (parent, state, params) {
            this._super.apply(this, arguments);
            this.enableLinking = params.enableLinking;
            this.fieldWidgets = params.widgets || {};
            this.paddingLeftHeaderTabWidth = config.device.isMobile ? 5 : 30;
        },
    });
    var SectionAndNoteFieldOne2ManyExt = FieldOne2Many.extend({
        _getRenderer: function () {
            if (this.view.arch.tag === 'pivot') {
                return One2ManyPivotRenderer;
            }
            if (this.view.arch.tag === 'graph') {
                return GraphRenderer;
            }
            return this._super.apply(this, arguments);
        },
    });
    fieldRegistry.add('section_and_note_one2many_ext', SectionAndNoteFieldOne2ManyExt);
    return SectionAndNoteFieldOne2ManyExt;
});
