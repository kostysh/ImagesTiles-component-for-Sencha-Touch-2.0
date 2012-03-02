Ext.Loader.setPath({
    'Imtl': 'app',
    'Cs': 'src'
});

Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'Imtl',
    
    views: ['Viewport'],
    
    models: ['Catalog'],
    
    stores: ['Catalog'],
	
    controllers : ['Main'],
    
    viewport: {
        autoMaximize: true
    },
	
    launch: function(){
        Ext.create('Imtl.view.Viewport');
    }
});
