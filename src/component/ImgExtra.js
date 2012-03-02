/**
 * @filename ImgExtra.js
 *
 * @name Image Extra
 * @fileOverview Extended version of ST2 Image component
 *      Features:
 *      - FixedHeight ability
 *      - Badge on component
 *      - Title under image
 *      - 'imageload' and 'exception' events
 *
 * @author Constantine V. Smirnov kostysh(at)gmail.com
 * @date 20120302
 * @version 1.0
 * @license MIT
 *
 * @requires Sencha Touch 2.0 
 * @requires ImgExtra.css
 * 
 */

/**
 * ImageExtra component configuration (except standart Img config)
 * 
 * @param fixedHeight {string} Height in px for fixing iamge height
 * @param badgeText {string} Text for badge
 * @param title {string} Text for image title
 *
 */

/**
 * Custom events
 * 
 * @event imageload On image load success
 * @event imageupdated On image src updated
 * @event exception On image load fail
 *
 */

Ext.define('Cs.component.ImgExtra', {
    extend: 'Ext.Img',
    requires: ['Ext.Container'],
    
    xtype: 'ex-image',
    
    template: [
        {
            tag: 'span',
            reference: 'badgeElement',
            hidden: true
        },
        {
            tag: 'span',
            reference: 'titleElement',
            hidden: true
        }
    ],
    
    config: {
        mode: 'tag',
        src: null,
        hidden: true,
        
        fixedHeight: null,
        
        badgeText: null,
        badgeCls: Ext.baseCSSPrefix + 'badge',
        hasBadgeCls: Ext.baseCSSPrefix + 'hasbadge',
        childrenBadge: true,
        
        title: null,
        titleCls: 'cs-image-title',
        hasTitleCls: 'cs-image-hastitle'
    },
    
    updateBadgeText: function(badgeText) {
        var element = this.element,
        badgeElement = this.badgeElement;
        
        if (badgeText && this.getChildrenBadge()) {
            badgeElement.show();
            badgeElement.setText(badgeText);
        }
        else {
            badgeElement.hide();
        }

        element[(badgeText) ? 'addCls' : 'removeCls'](this.getHasBadgeCls());
    },
    
    updateBadgeCls: function(badgeCls, oldBadgeCls) {
        this.badgeElement.replaceCls(oldBadgeCls, badgeCls);
    },

    updateHasBadgeCls: function(hasBadgeCls, oldHasBadgeCls) {
        var element = this.element;

        if (element.hasCls(oldHasBadgeCls)) {
            element.replaceCls(oldHasBadgeCls, hasBadgeCls);
        }
    },
    
    applyFixedHeight: function(height) {
        if (height) {
            this.setHeight(height);
        }
        
        return height;
    },
    
    updateSrc: function() {
        var self  = this,
            img = self.imageElement,
            dom = img.dom;

        dom.onload  = Ext.Function.bind(self.onLoaded, self, [img], 0);
        dom.onerror = Ext.Function.bind(self.onError, self, [img], 0);
        
        self.setHidden(true);
        
        self.fireEvent('imageupdated', self, [img], 0);

        self.callParent(arguments);
    },
    
    updateTitle: function(titleText) {
        var element = this.element,
        titleElement = this.titleElement;
        
        if (titleText) {
            titleElement.show();
            titleElement.setText(titleText);
        }
        else {
            titleElement.hide();
        }

        element[(titleText) ? 'addCls' : 'removeCls'](this.getHasTitleCls());
    },
    
    updateTitleCls: function(badgeCls, oldBadgeCls) {
        this.titleElement.replaceCls(oldBadgeCls, badgeCls);
    },
    
    updateHasTitleCls: function(hasTitleCls, oldHasTitleCls) {
        var element = this.element;

        if (element.hasCls(oldHasTitleCls)) {
            element.replaceCls(oldHasTitleCls, hasTitleCls);
        }
    },
    
    applyMode: function(mode) {
        if (mode !== 'tag') {
            Ext.Logger.warn("Only tag mode of img supported", this);
        }
        return 'tag';
    },
    
    //Custom events
    onLoaded: function(el, e) {
        this.setHidden(false);
        this.fireEvent('imageload', this, el, e);
    },

    onError: function(el, e) {
        this.fireEvent('exception', this, el, e);
    }
});
