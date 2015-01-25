import defaultFor from 'trailblazer/utils/default-for';
import Ember from 'ember';


// ==========================================================================
// Project:   Ember EasyForm
// Copyright: Copyright 2013 DockYard, LLC. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

// Version: 1.0.0.beta.1
// Copyright: Copyright 2013 DockYard, LLC. and contributors.
!function(){Ember.EasyForm=Ember.Namespace.create({VERSION:"1.0.0.beta.1"})}(),function(){Ember.EasyForm.Config=Ember.Namespace.create({_wrappers:{"default":{formClass:"",fieldErrorClass:"fieldWithErrors",inputClass:"input",errorClass:"error",hintClass:"hint",labelClass:"",inputTemplate:"easyForm/input",errorTemplate:"easyForm/error",labelTemplate:"easyForm/label",hintTemplate:"easyForm/hint",wrapControls:!1,controlsWrapperClass:"",buttonClass:""}},modulePrefix:"appkit",_inputTypes:{},_templates:{},registerWrapper:function(e,t){this._wrappers[e]=Ember.$.extend({},this._wrappers["default"],t)},getWrapper:function(e){var t=this._wrappers[e];return Ember.assert("The wrapper '"+e+"' was not registered.",t),t},registerInputType:function(e,t){this._inputTypes[e]=t},getInputType:function(e){return this._inputTypes[e]},registerTemplate:function(e,t){this._templates[e]=t},getTemplate:function(e){return this._templates[e]}})}(),function(){Ember.Handlebars.registerHelper("error-field",function(e,t){return t=Ember.EasyForm.processOptions(e,t),t.hash.propertyBinding&&(t.hash.property=t.data.view.getStream(t.hash.propertyBinding).value()),Ember.Handlebars.helpers.view.call(this,Ember.EasyForm.Error,t)})}(),function(){Ember.Handlebars.registerHelper("form-for",function(e,t){var r=t.data.view;Ember.Handlebars.helpers.view.call(this,Ember.EasyForm.Form,t);var a=r._childViews[r._childViews.length-1];return a._keywords.formForModelPath=e,a})}(),function(){Ember.Handlebars.registerHelper("hint-field",function(e,t){return t=Ember.EasyForm.processOptions(e,t),t.hash.text||t.hash.textBinding?Ember.Handlebars.helpers.view.call(this,Ember.EasyForm.Hint,t):void 0})}(),function(){Ember.Handlebars.helpers["ember-input"]=Ember.Handlebars.helpers.input,Ember.Handlebars.registerHelper("input",function(e,t){return 1===arguments.length?Ember.Handlebars.helpers["ember-input"].call(this,arguments[0]):(t=Ember.EasyForm.processOptions(e,t),t.hash.isBlock=!!t.fn,Ember.Handlebars.helpers.view.call(this,Ember.EasyForm.Input,t))})}(),function(){{var e=Ember.get;Ember.set}Ember.Handlebars.registerHelper("input-field",function(t,r){function a(e,t,r){return r.data.view.getStream(t).value()}r=Ember.EasyForm.processOptions(t,r),r.hash.propertyBinding&&(r.hash.property=a(this,r.hash.propertyBinding,r)),r.hash.inputOptionsBinding&&(r.hash.inputOptions=a(this,r.hash.inputOptionsBinding,r));var i=a(this,"formForModelPath",r);r.hash.modelPath=i,t=r.hash.property;var n=function(e){if(!e)return null;var t=!!r.data.view._keywords[e.split(".")[0]];return t?e:i?i+"."+e:e};r.hash.valueBinding=n(t);var s=this,o=function(t){var r=(e(s,"content")||s).constructor;return r.proto?Ember.meta(r.proto(),!1).descs[t]:null};if(r.hash.viewName="input-field-"+r.data.view.elementId,r.hash.inputOptions){var l,p=r.hash.inputOptions;for(l in p)p.hasOwnProperty(l)&&(r.hash[l]=p[l]);delete r.hash.inputOptions}if("text"===r.hash.as)return Ember.Handlebars.helpers.view.call(s,Ember.EasyForm.TextArea,r);if("select"===r.hash.as)return delete r.hash.valueBinding,r.hash.contentBinding=n(r.hash.collection),r.hash.selectionBinding=n(r.hash.selection),r.hash.valueBinding=n(r.hash.value),Ember.isNone(r.hash.selectionBinding)&&Ember.isNone(r.hash.valueBinding)&&(r.hash.selectionBinding=n(t)),Ember.Handlebars.helpers.view.call(s,Ember.EasyForm.Select,r);if("checkbox"===r.hash.as)return Ember.isNone(r.hash.checkedBinding)&&(r.hash.checkedBinding=n(t)),Ember.Handlebars.helpers.view.call(s,Ember.EasyForm.Checkbox,r);if(r.hash.as){var h=Ember.EasyForm.Config.getInputType(r.hash.as);if(h)return Ember.Handlebars.helpers.view.call(s,h,r);r.hash.type=r.hash.as}else if(t.match(/password/))r.hash.type="password";else if(t.match(/email/))r.hash.type="email";else if(t.match(/url/))r.hash.type="url";else if(t.match(/color/))r.hash.type="color";else if(t.match(/^tel/))r.hash.type="tel";else if(t.match(/search/))r.hash.type="search";else if("number"===o(t)||"number"==typeof e(s,t))r.hash.type="number";else if("date"===o(t)||!Ember.isNone(e(s,t))&&e(s,t).constructor===Date)r.hash.type="date";else if("boolean"===o(t)||!Ember.isNone(s.get(t))&&e(s,t).constructor===Boolean)return r.hash.checkedBinding=t,Ember.Handlebars.helpers.view.call(s,Ember.EasyForm.Checkbox,r);return Ember.Handlebars.helpers.view.call(s,Ember.EasyForm.TextField,r)})}(),function(){Ember.Handlebars.registerHelper("label-field",function(e,t){return t=Ember.EasyForm.processOptions(e,t),t.hash.viewName="label-field-"+t.data.view.elementId,Ember.Handlebars.helpers.view.call(this,Ember.EasyForm.Label,t)})}(),function(){Ember.Handlebars.registerHelper("submit",function(e,t){return"object"==typeof e&&(t=e,e=void 0),t.hash.context=this,t.hash.value=e||"Submit","button"===t.hash.as?Ember.Handlebars.helpers.view.call(this,Ember.EasyForm.Button,t):Ember.Handlebars.helpers.view.call(this,Ember.EasyForm.Submit,t)})}(),function(){Ember.EasyForm.BaseView=Ember.View.extend({classNameBindings:["property"],wrapper:function(){var e=this.nearestWithProperty("wrapper");return e?e.get("wrapper"):"default"}.property(),wrapperConfig:function(){return Ember.EasyForm.Config.getWrapper(this.get("wrapper"))}.property("wrapper"),templateForName:function(e){var t;return this.container&&(t=this.container.lookup("template:"+e)),t||Ember.EasyForm.Config.getTemplate(e)},formForModel:function(){var e=this._keywords.formForModelPath;return this.get("context"===e||"controller"===e||"this"===e?"context":e?"context."+e:"context")}.property()})}(),function(){Ember.EasyForm.Checkbox=Ember.Checkbox.extend()}(),function(){Ember.EasyForm.Error=Ember.EasyForm.BaseView.extend({tagName:"span",classNameBindings:["wrapperConfig.errorClass"],init:function(){this._super(),Ember.Binding.from("formForModel.errors."+this.property).to("errors").connect(this)},templateName:Ember.computed.oneWay("wrapperConfig.errorTemplate"),errorText:Ember.computed.oneWay("errors.firstObject")})}(),function(){Ember.EasyForm.Form=Ember.EasyForm.BaseView.extend({tagName:"form",attributeBindings:["novalidate"],classNameBindings:["wrapperConfig.formClass"],novalidate:"novalidate",wrapper:"default",init:function(){this._super(),this.action=this.action||"submit"},submit:function(e){var t,r=this;e&&e.preventDefault(),Ember.isNone(this.get("formForModel.validate"))?this.get("controller").send(this.action):(t=Ember.isNone(this.get("formForModel").validate)?this.get("formForModel.content").validate():this.get("formForModel").validate(),t.then(function(){r.get("formForModel.isValid")&&r.get("controller").send(r.action)}))}})}(),function(){Ember.EasyForm.Hint=Ember.EasyForm.BaseView.extend({tagName:"span",classNameBindings:["wrapperConfig.hintClass"],templateName:Ember.computed.oneWay("wrapperConfig.hintTemplate"),hintText:Ember.computed.oneWay("text")})}(),function(){Ember.EasyForm.Input=Ember.EasyForm.BaseView.extend({init:function(){this._super(),this.classNameBindings.push("showError:"+this.get("wrapperConfig.fieldErrorClass")),Ember.defineProperty(this,"showError",Ember.computed.and("canShowValidationError","formForModel.errors."+this.property+".firstObject")),this.isBlock||this.set("templateName",this.get("wrapperConfig.inputTemplate"))},setupValidationDependencies:function(){var e,t=this.get("formForModel._dependentValidationKeys");if(t)for(e in t)t[e].contains(this.property)&&this._keysForValidationDependencies.pushObject(e)}.on("init"),_keysForValidationDependencies:Ember.A(),dependentValidationKeyCanTrigger:!1,tagName:"div",classNames:["string"],classNameBindings:["wrapperConfig.inputClass"],didInsertElement:function(){var e="label-field-"+this.elementId,t=this.get(e);t&&this.set(e+".for",this.get("input-field-"+this.elementId+".elementId"))},concatenatedProperties:["inputOptions","bindableInputOptions"],inputOptions:["as","collection","optionValuePath","optionLabelPath","selection","value","multiple","name"],bindableInputOptions:["placeholder","prompt","disabled"],defaultOptions:{name:function(){return this.property?this.property:void 0}},inputOptionsValues:function(){var e,t,r,a,i={},n=this.inputOptions,s=this.bindableInputOptions,o=this.defaultOptions;for(e=0;e<n.length;e++)t=n[e],this[t]&&("boolean"==typeof this[t]&&(this[t]=t),i[t]=this[t]);for(e=0;e<s.length;e++)t=s[e],r=t+"Binding",(this[t]||this[r])&&(i[r]="view."+t);for(t in o)o.hasOwnProperty(t)&&(i[t]||(a=o[t].apply(this))&&(i[t]=a));return i}.property(),focusOut:function(){this.set("hasFocusedOut",!0),this.showValidationError()},showValidationError:function(){this.get("hasFocusedOut")&&(Ember.isEmpty(this.get("formForModel.errors."+this.property))?this.set("canShowValidationError",!1):this.set("canShowValidationError",!0))},input:function(){this._keysForValidationDependencies.forEach(function(e){this.get("parentView.childViews").forEach(function(t){t.property===e&&t.showValidationError()},this)},this)}})}(),function(){Ember.EasyForm.Label=Ember.EasyForm.BaseView.extend({tagName:"label",attributeBindings:["for"],classNameBindings:["wrapperConfig.labelClass"],labelText:function(){return this.get("text")||Ember.EasyForm.humanize(this.get("property"))}.property("text","property"),templateName:Ember.computed.oneWay("wrapperConfig.labelTemplate")})}(),function(){Ember.EasyForm.Select=Ember.Select.extend()}(),function(){Ember.EasyForm.Submit=Ember.EasyForm.BaseView.extend({tagName:"input",attributeBindings:["type","value","disabled"],classNameBindings:["wrapperConfig.buttonClass"],type:"submit",disabled:function(){return!this.get("formForModel.isValid")}.property("formForModel.isValid"),init:function(){this._super(),this.set("value",this.value)}})}(),function(){Ember.EasyForm.Button=Ember.EasyForm.BaseView.extend({tagName:"button",template:Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,r,a){var i;i=t._triageMustache.call(e,"text",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),a.buffer.push(null!=i?i:"")},useData:!0}),attributeBindings:["type","disabled"],type:"submit",disabled:function(){return!this.get("formForModel.isValid")}.property("formForModel.isValid"),init:function(){this._super(),this.set("formForModel.text",this.value)}})}(),function(){Ember.EasyForm.TextArea=Ember.TextArea.extend()}(),function(){Ember.EasyForm.TextField=Ember.TextField.extend()}(),function(){Ember.EasyForm.Config.registerTemplate("easyForm/error",Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,r,a){var i;i=t._triageMustache.call(e,"view.errorText",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),a.buffer.push(null!=i?i:"")},useData:!0}))}(),function(){Ember.EasyForm.Config.registerTemplate("easyForm/hint",Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,r,a){var i;i=t._triageMustache.call(e,"view.hintText",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),a.buffer.push(null!=i?i:"")},useData:!0}))}(),function(){Ember.EasyForm.Config.registerTemplate("easyForm/input",Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,r,a){var i=t.helperMissing,n=this.escapeExpression,s="";return a.buffer.push(n((t["label-field"]||e&&e["label-field"]||i).call(e,{name:"label-field",hash:{textBinding:"view.label",propertyBinding:"view.property"},hashTypes:{textBinding:"STRING",propertyBinding:"STRING"},hashContexts:{textBinding:e,propertyBinding:e},types:[],contexts:[],data:a}))),a.buffer.push(n((t.partial||e&&e.partial||i).call(e,"easyForm/inputControls",{name:"partial",hash:{},hashTypes:{},hashContexts:{},types:["STRING"],contexts:[e],data:a}))),s},useData:!0}))}(),function(){Ember.EasyForm.Config.registerTemplate("easyForm/inputControls",Ember.Handlebars.template({1:function(e,t,r,a){var i=t.helperMissing,n=this.escapeExpression;a.buffer.push(n((t["error-field"]||e&&e["error-field"]||i).call(e,{name:"error-field",hash:{propertyBinding:"view.property"},hashTypes:{propertyBinding:"STRING"},hashContexts:{propertyBinding:e},types:[],contexts:[],data:a})))},3:function(e,t,r,a){var i=t.helperMissing,n=this.escapeExpression;a.buffer.push(n((t["hint-field"]||e&&e["hint-field"]||i).call(e,{name:"hint-field",hash:{textBinding:"view.hint",propertyBinding:"view.property"},hashTypes:{textBinding:"STRING",propertyBinding:"STRING"},hashContexts:{textBinding:e,propertyBinding:e},types:[],contexts:[],data:a})))},compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,r,a){var i,n=t.helperMissing,s=this.escapeExpression,o="";return a.buffer.push(s((t["input-field"]||e&&e["input-field"]||n).call(e,{name:"input-field",hash:{inputOptionsBinding:"view.inputOptionsValues",propertyBinding:"view.property"},hashTypes:{inputOptionsBinding:"STRING",propertyBinding:"STRING"},hashContexts:{inputOptionsBinding:e,propertyBinding:e},types:[],contexts:[],data:a}))),i=t["if"].call(e,"view.showError",{name:"if",hash:{},hashTypes:{},hashContexts:{},fn:this.program(1,a),inverse:this.noop,types:["ID"],contexts:[e],data:a}),null!=i&&a.buffer.push(i),i=t["if"].call(e,"view.hint",{name:"if",hash:{},hashTypes:{},hashContexts:{},fn:this.program(3,a),inverse:this.noop,types:["ID"],contexts:[e],data:a}),null!=i&&a.buffer.push(i),o},useData:!0}))}(),function(){Ember.EasyForm.Config.registerTemplate("easyForm/label",Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,r,a){var i;i=t._triageMustache.call(e,"view.labelText",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),a.buffer.push(null!=i?i:"")},useData:!0}))}(),function(){Ember.EasyForm.humanize=function(e){return e.underscore().split("_").join(" ").capitalize()},Ember.EasyForm.eachTranslatedAttribute=function(e,t){var r,a=/(.+)Translation$/;for(var i in e)r=i.match(a),r&&t.call(e,r[1],Ember.I18n.t(e[i]))},Ember.EasyForm.processOptions=function(e,t){if(t){if(Ember.I18n){var r=Ember.I18n.eachTranslatedAttribute||Ember.EasyForm.eachTranslatedAttribute;r(t.hash,function(e,r){t.hash[e]=r,delete t.hash[e+"Translation"]})}t.hash.property=e}else t=e;return t}}(),"undefined"==typeof location||"localhost"!==location.hostname&&"127.0.0.1"!==location.hostname||Ember.Logger.warn("You are running a production build of Ember on localhost and won't receive detailed error messages. If you want full error messages please use the non-minified build provided on the Ember website.");


export default {

  name: 'easy-form',

  initialize: function( container, app ) {

    /**
    Custom input template with wrapper
    */

    Ember.EasyForm.Config.registerTemplate('easyForm/input', Ember.Handlebars.compile(
      '{{label-field propertyBinding="view.property" textBinding="view.label"}}' +
      '<div class="input_wrapper">' +
        '{{partial "easyForm/inputControls"}}' +
      '</div>'
    ));

    /**
    Default option overrides
    */

    Ember.EasyForm.Config.registerWrapper('default', {
      errorClass: 'error',
      formClass: 'form',
      fieldErrorClass: 'input_with_errors',
      hintClass: 'hint',
      inputClass: 'control',
      labelClass: 'label',
    });

    Ember.EasyForm.Checkbox.reopen({
      classNames: ['input-checkbox'],
    });

    Ember.EasyForm.TextField.reopen({
      attributeBindings: ['test:data-test'],
      classNames: ['input'],
      test: Ember.computed.alias('parentView.test'),
    });

    Ember.EasyForm.TextArea.reopen({
      attributeBindings: ['test:data-test'],
      classNames: ['input-textarea'],
      test: Ember.computed.alias('parentView.test'),
    });

    /**
    Overrides the original `errorText` property to add the property name to the error message. For example:

    can't be blank --> Name can't be blank
    must be a number --> Age must be a number

    If a label is specified on the input, this will be used in place of the property name.
    */

    Ember.EasyForm.Error.reopen({
      errorText: function() {
        var propertyName = this.get('parentView.label') || this.get('property') || '';

        return Ember.EasyForm.humanize(propertyName) + ' ' + this.get('errors.firstObject');
      }.property('errors.[]', 'value'),
    });

    /**
    Temporarily binds a success class the the control when the input goes from invalid to valid.
    */

    Ember.EasyForm.Input.reopen({
      classNameBindings: ['showValidity:input_with_validity'],
      showValidity: false,

      setInvalidToValid: function() {
        // If we go from error to no error
        if (!this.get('showError') && this.get('canShowValidationError')) {
          Ember.run.debounce(this, function() {
            var hasAnError = this.get('formForModel.errors.' + this.get('property') + '.length');

            if (!hasAnError && !this.get('isDestroying')) {
              this.set('showValidity', true);

              Ember.run.later(this, function() {
                if (!this.get('isDestroying')) {
                  this.set('showValidity', false);
                }
              }, 1500);
            }
          }, 50);
        }
      }.observes('showError'),

      /**
      An override of easyForm's default `focusOut` method to ensure validations are not shown when the user clicks cancel.

      @method focusOut
      */

      focusOut: function() {
        // Double run loop so `cancelClick` is set properly
        Ember.run.next(this, function() {
          Ember.run.next(this, function() {
            if (!this.get('parentView.cancelClicked') && !this.get('isDestroying')) {
              this.set('hasFocusedOut', true);
              this.showValidationError();
            }
          });
        });
      }

    });

    /* Datepicker built with pickaday */

    Ember.EasyForm.DatePicker = Em.EasyForm.TextField.extend({

      format: function() {
        return defaultFor(
          this.get('parentView.format'),
          'MMM D, YYYY'
        );
      }.property('parentView.format'),

      formatDate: function() {
        var value = this.get('value');
        var format = this.get('format');
        var formattedValue = moment(value).format(format);

        this.set('value', formattedValue);
      }.on('willInsertElement'),

      renderDatePicker: function() {
        var parentView = this.get('parentView');
        var minDate = defaultFor(
          parentView.get('minDate'),
          moment()
        );

        var datepicker = new Pikaday({
          defaultDate: this.get('value'),
          field: this.$()[0],
          format: this.get('format'),
          margin: this.get('margin'),
          maxDate: parentView.get('maxDate'),
          minDate: minDate
        })
      }.on('didInsertElement'),

    });

    Em.EasyForm.Config.registerInputType('date', Em.EasyForm.DatePicker);

  }
};
