/**
 * @filename ImagesTiles.js
 *
 * @name ImagesTiles
 * @fileOverview Component for displaying nested data as images tiles.
 *               Main configuration for images tiles component
 *
 * @author Constantine V. Smirnov kostysh(at)gmail.com
 * @date 20120302
 * @version 1.0
 * @license MIT
 *
 * @requires Sencha Touch 2.0
 * @requires Tile.js Cs.component.Tile 
 * @requires ImagesTiles.css
 * 
 * Usage:
 
 .....
 items: [
            {
                xtype: 'img-tiles',
                id: 'itiles',
                title: 'Catalog',
                store: 'nestedItemsStore',
                tileConfig: {
                    childrenBadge: true,
                    fixedHeight: '150px'//if undefined: original images size 
                }
            }
        ]
 
 *
 */

/**
 * ImagesTiles component configuration
 * 
 * @param config.dataviewCls {string} CSS class for whole dataview container
 * @param config.itemCls {string} CSS class for tiles
 * @param config.pressedCls {string} CSS class for pressed tiles
 * @param config.selectedCls {string} CSS class for selected tiles
 * @param config.loadingText {string} Loading message on dataview container
 * @param config.tileConfig.childrenBadge {boolean} Show rule for badges
 * @param config.tileConfig.fixedHeight {string} Fixed height of tile (in px)
 */

Ext.define('Cs.component.ImagesTiles', {
    extend: 'Ext.NestedList',
    requires: [
        'Cs.component.Tile'
    ],
    
    xtype: 'img-tiles',
    
    //collection of inner tiles states
    itemsState: {},
    
    config: {
        dataviewCls: 'cs-tilesdataview',
        itemCls: 'cs-imagetile',
        pressedCls: 'cs-tile-pressed',
        selectedCls: 'cs-tile-selected',
        
        tileConfig: {
            childrenBadge: true,
            fixedHeight: false
        },
        
        loadingText: 'Loading...'
    },
    
    //Initial tile state setup
    onItemLoading: function(cmp) {
        this.itemsState[cmp.id] = false;
    },    
    
    //Tile state updating
    onItemLoaded: function(cmp) {
        this.itemsState[cmp.id] = true;
        
        var flag = true;
        for (var i in this.itemsState) {
            if (this.itemsState[i] === false) {
                flag = false;
            }
        }
        
        //Loading of all inner tiles is finished
        if (flag) {
            this.setMasked(false);
        }
    },
    
    //Generating tiles from store
    getList: function(node) {
        var self = this;
        
        //Build store for current node
        var nodeStore = Ext.create('Ext.data.NodeStore', {
            recursive: false,
            node: node,
            rootVisible: false,
            model: self.getStore().getModel()
        });
        
        node.expand();
        
        //Enable mask while dataview loading
        self.setMasked({
            xtype: 'loadmask',
            message: self.getLoadingText()
        });
        
        //Tiles dataview configuration
        var newDataView = Ext.create('Ext.DataView', {
            pressedDelay: 50,
            autoDestroy: true,
            store: nodeStore,
            onItemDisclosure: self.getOnItemDisclosure(),
            allowDeselect : self.getAllowDeselect(),
            cls: self.getDataviewCls(),
            itemCls: self.getItemCls(),
            pressedCls: self.getPressedCls(),
            selectedCls: self.getSelectedCls(),
            itemConfig: self.getTileConfig() || {},
            padding: '0 0 12 0',//bottom padding for dataview container
            useComponents: true,
            defaultType: 'imgtile',
            
            listeners: [
                
                //Custom events handlers
                {
                    event: 'itemloading',
                    fn: 'onItemLoading',
                    scope: self
                },
                {
                    event: 'itemloaded',
                    fn: 'onItemLoaded',
                    scope: self
                },
                
                //Events handlers from Ext.NestedList component
                {
                    event: 'itemdoubletap', 
                    fn: 'onItemDoubleTap', 
                    scope: self
                },
                {
                    event: 'itemtap', 
                    fn: 'onItemInteraction', 
                    scope: self, 
                    order: 'before'
                },

                {
                    event: 'itemtouchstart', 
                    fn: 'onItemInteraction', 
                    scope: self, 
                    order: 'before'
                },

                {
                    event: 'itemtap', 
                    fn: 'onItemTap', 
                    scope: self
                },
                {
                    event: 'beforeselect', 
                    fn: 'onBeforeSelect', 
                    scope: self
                },
                {
                    event: 'containertap', 
                    fn: 'onContainerTap', 
                    scope: self
                },
                {
                    event: 'selectionchange', 
                    fn: 'onSelectionChange', 
                    scope: self
                }
            ]
        });
        
        return newDataView;
    }
});