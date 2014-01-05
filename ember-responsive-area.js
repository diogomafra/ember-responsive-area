// ==========================================================================
// Project:   Ember Responsive Area
// Copyright: Copyright 2014 Diogo Edegar Mafra
// License:   Licensed under MIT license
// ==========================================================================

(function() {

  var EmberResponsiveArea = window.EmberResponsiveArea = {};


  // This mixin can be used in a View or Component.
  // It will render only if the element is visible.
  EmberResponsiveArea.Mixin = Ember.Mixin.create({

    _canRender: false,

    render: function() {
      if (this.get('_canRender')) {
        return this._super.apply(this, arguments);
      }
    },

    _initialVisibilityCheck: (function() {
      // This method is called again after `rerender()`, this avoids an infinite recursion
      if (this.get('_canRender')) {
        return;
      }
      // Make the initial check
      this._checkVisibility();
      // If it's not already visible, setup the listener
      if (!this.get('_canRender')) {
        return this._registerListener();
      }
    }).on('didInsertElement'),

    _checkVisibility: function(dontRerender) {
      if (this.$().is(':visible')) {
        // When it becomes visible, remove the listener and rerender
        this.set('_canRender', true);
        this._removeListener();
        return this.rerender();
      }
    },

    _registerListener: function() {
      var that = this;
      // Check the visibility when the window is resized (once per run-loop)
      return $(window).on('resize.responsive-area', function() {
        return Ember.run.once(that, '_checkVisibility');
      });
    },

    _removeListener: (function() {
      return $(window).off('resize.responsive-area');
    }).on('willDestroyElement')

  });


  EmberResponsiveArea.Component = Ember.Component.extend(EmberResponsiveArea.Mixin);


  // This helper can be used in areas that are invisible depending on the size of the screen.
  // It will render the template only if the element is visible.
  // Example: {{#responsive-area}}My content{{/responsive-area}}
  Ember.Handlebars.registerHelper('responsive-area', function(options) {
    return Ember.Handlebars.helpers.view.call(this, EmberResponsiveArea.Component, options);
  });


}).call(this);