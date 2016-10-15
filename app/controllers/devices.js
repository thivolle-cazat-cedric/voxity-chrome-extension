angular.module('voxityChromeApp').controller('devicesListCtrl', [
    '$scope', 'api', 'apiDevices', 
    function ($scope, api, apiDevices) {
        $scope.loading = true;
        $scope.devices = [];
        $scope.errors = {err: false,mess:''};
        $scope.search = {};


        $scope.getClass = apiDevices.getIconClassStatus;
        $scope.getDescription = apiDevices.frDescription;

        $scope.init = function(){
            $scope.errors = {err: false,mess:''};
            $scope.loading = true;
            if (!api.token){
                return null;
            } else {
                apiDevices.get(function(err,devices){
                    if(err){
                        $scope.errors.err = true;
                        $scope.errors.mess = 'Une erreur est survenu lors du chargement des équipements. err' + err.status;
                    } else {
                        $scope.devices = devices;
                    }
                    $scope.loading = false;
               })
            }
        };$scope.init();


        $scope.$on('api:TOKEN_SET', $scope.init);
    }
])


angular.module('voxityChromeApp').controller('deviceCtrl', [
    '$scope', 'api', 'apiDevices', '$routeParams',
    function ($scope, api, apiDevices, $routeParams) {
        $scope.loading = true;
        $scope.device = null;
        $scope.errors = {err: false,mess:''};

        $scope.getClass = apiDevices.getIconClassStatus;
        $scope.getDescription = apiDevices.frDescription;
        $scope.getName = apiDevices.getName;
        $scope.getExten = apiDevices.getExten;

        $scope.init = function(){
            this.id = $routeParams.phoneId;
            this.errors = {err: false,mess:''};
            this.loading = true;
            if (!api.token){
                return null;
            } else {
                apiDevices.getId(this.id, function(err, device){
                    if(err){
                        if (err.status != 404){                            
                            $scope.errors.err = true;
                            $scope.errors.mess = 'Une erreur est survenu lors du chargement de l\'équipements. err' + err.status;
                        } else {
                            $scope.errors.err = true;
                            $scope.errors.notFound = true;
                        }
                    } else {
                        $scope.device = device;
                    }
                    $scope.loading = false;
               })
            }
        };$scope.init();


        $scope.$on('api:TOKEN_SET', $scope.init);
    }
])