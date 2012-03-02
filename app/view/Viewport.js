Ext.define('Imtl.view.Viewport', {
    extend: 'Ext.Panel',
    requires: ['Cs.component.ImagesTiles'],
    
    config: {
        fullscreen: true,
        layout: 'fit',
        
        items: [
            {
                xtype: 'img-tiles',
                id: 'itiles',
                title: 'ImagesTiles Demo',
                style: 'font-size: 0.8em;',
                store: 'Catalog',
                tileConfig: {
                    childrenBadge: true,
                    fixedHeight: '70px'
                }
            }
        ]
    }
});
