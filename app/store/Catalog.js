Ext.define('Imtl.store.Catalog', {
    extend: 'Ext.data.TreeStore',
    
    config: {
        model: 'Imtl.model.Catalog',
        autoLoad: true,
        
        proxy: {
            type: 'ajax',
            url: 'data/data.json',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
        }
    }
});