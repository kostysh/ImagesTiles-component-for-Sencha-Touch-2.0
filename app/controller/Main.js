Ext.define('Imtl.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'Ext.data.Store'
    ],
    
    config: {
        views: [],
        
        refs: {
            itiles: '#itiles'
        },
        
        control: {
            itiles: {
                leafitemtap: 'onLeafItemTap'
            }
        }
    },
    
    onLeafItemTap: function(cmp, dataview, index) {
        var self= this;
        var store = dataview.getStore();
        var record = store.getAt(index);
        
        Ext.Msg.alert(record.get('text'), 
                      record.get('description'), 
                      Ext.emptyFn);
        
        console.log('Current data record:', record);
    }
});