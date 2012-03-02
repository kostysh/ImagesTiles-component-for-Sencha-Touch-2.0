/**
 * @filename Tile.js
 *
 * @name Image tile
 * @fileOverview Image tile-like DataItem component.
 *               Part of ImagesTiles component
 *
 * @author Constantine V. Smirnov kostysh(at)gmail.com
 * @date 20120302
 * @version 1.0
 * @license MIT
 *
 * @requires Sencha Touch 2.0 
 * @requires ImgExtra.js Cs.component.ImgExtra 
 * @requires ImagesTiles.css
 * 
 */

/**
 * Custom events
 * 
 * @event itemloading On item loading start
 * @event itemloaded On item loading finish
 * 
 */

Ext.define('Cs.component.Tile', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Cs.component.ImgExtra'],
    
    xtype: 'imgtile',
    
    config: {
        hidden: true,
        
        imgTile: true,
        
        dataMap: {
            
            //Dataitem store data mapping
            getImgTile: {
                setSrc: 'src',
                setAlt: 'text',
                setTitle: 'text',
                setBadgeText: 'children'//added dynamically
            }
        },
        
        bubbleEvents: [
            'itemloading',
            'itemloaded'
        ]
    },
    
    applyRecord: function(record) {
        var children = record.childNodes.length;
        if (children > 0) {

            //Add children count of current node
            record.data['children'] = children;
        }
            
        return record;
    },
    
    applyImgTile: function(imt) {
        var self = this;
        
        var tileItem = Ext.factory(imt, Cs.component.ImgExtra, self.getImgTile());
        
        tileItem.on({
            scope: self,
            imageupdated: function(el, e) {
                
                if (!self.rendered) {
                    self.on({
                        renderedchange: function() {
                            self.fireEvent('itemloading', self, el, e);
                        }
                    });
                }
            },
            imageload: function(el, e) {
                
                //Notification about item loading finish
                self.fireEvent('itemloaded', self, el, e);
                self.show();
            }
        });
        
        return tileItem;
    },

    updateImgTile: function(newImgTile, oldImgTile) {
        if (oldImgTile) {
            this.remove(oldImgTile);
        }

        if (newImgTile) {
            this.add(newImgTile);
        }
    }
});