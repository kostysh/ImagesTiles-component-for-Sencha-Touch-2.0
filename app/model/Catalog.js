Ext.define('Imtl.model.Catalog', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            {
                name: 'text',        
                type: 'string'
            },

            {
                name: 'description', 
                type: 'string'
            },
            
            {
                name: 'src',
                type: 'string'
            },

            {
                name: 'leaf',        
                type: 'boolean', 
                defaultValue: false
            },

            {
                name: 'items',       
                type: 'auto'
            }
        ]
    }
});
