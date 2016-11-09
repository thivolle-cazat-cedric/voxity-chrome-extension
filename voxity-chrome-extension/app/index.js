angular.module('voxityChromeApp').config(['$routeProvider',
    function(rp) {
        rp.when('', {templateUrl: "views/loading.html"});
        rp.when('/', {templateUrl: "views/loading.html", controller:"sideBarCtrl"});
        rp.when('/logout', {templateUrl: "views/logout.html"});
        rp.when('/about/',{
            templateUrl: 'views/core/about.html'
        })
        rp.otherwise({templateUrl: 'views/err/404.html'});
    }
]);


angular.module('voxity.devices').config(['vxtDeviceConfProvider',function(deviceConf) {
    settingsService.get(function(err, conf){
            if(angular.isObject(conf.device) && Object.keys(conf.device).length > 0){
                deviceConf.refreshListInterval = conf.device.refreshListInterval;
                deviceConf.autoRefreshList = conf.device.autoRefreshList;
                deviceConf.checkValue()
        } else {deviceConf.initDefault();}
    })
}]);

angular.module('voxity.contacts').config(['vxtContactsConfProvider',function(contact) {
    settingsService.get(function(err, conf){
        var conf = conf.contact;
        if(angular.isObject(conf) && Object.keys(conf).length > 0){
            contact.cacheDuration = conf.cacheDuration;
            contact.checkValue()
        } else {contact.initDefault();}
    });
}]);

angular.module('voxityChromeApp').run([
    'vxtCoreApi', 'settingsService',
    function(CoreApi, settingsService){
        CoreApi.init();
    }
]);

angular.module('voxityChromeApp').config(['$httpProvider', function ($httpProvider) {$httpProvider.interceptors.push('authInterceptorService');}]);
angular.module('voxityChromeApp').config(['$uibTooltipProvider', function($uibTooltipProvider){$uibTooltipProvider.options({appendToBody: true});}]);