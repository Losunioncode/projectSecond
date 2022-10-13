const myModule = (function(){
    'use strict';

    const _privateProperty = 'Hello World'
    const publicProperty = 'this is a public property'

    function _privateMethod(){
        console.log(_privateProperty)
    }

    function publicMethod(){
        _privateMethod();
    }
    return {
        publicMethod: publicMethod,
        publicProperty: publicProperty
    };
})();


myModule.publicMethod()
console.log(myModule.publicProperty)
