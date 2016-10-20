angular.module('voxity.channels').controller('makeCallCtrl', [
    '$scope', 'vxtApiChannels',
    function ($scope, apiChannels) {
        $scope.callProcessing = false;

        $scope.call = function(){
            this.callProcessing = true;
            apiChannels.post(this.phoneNumber, function(err, channel){
                if(!err){
                    $scope.phoneNumber = undefined;
                }else {console.log(err,status)}
                $scope.callProcessing = false;
            })
        }
        $scope.checkNumber = function(){
            this.phoneNumber = $scope.phoneNumber.replace(/[^\+\d\(\)]/g,'');
        }
    }
])

angular.module('voxity.channels').controller('channelsCtrl', [
    '$scope', 'vxtCoreApi',
    function ($scope, apiChannels) {
        $scope.errors = {err: false,mess:''};
        $scope.channels = {};
        

        $scope.init = function(){
            $scope.errors = {err: false,mess:''};
            $scope.loading = true;
            if (!api.token){
                return null;
            } else {
                apiChannels.get(function(err, channels){
                    if (err){
                        $scope.errors.err = true;
                        $scope.errors.mess = "Une erreur est survenu lors du chargement des appels en cours. err"+err.status;
                        $scope.channels = {};
                    } else {
                        angular.forEach(channels, function(c){
                            if(c.caller_num != c.exten){
                                // is incoming call
                                if (!$scope.channels[c.exten]) {
                                    $scope.channels[c.exten] = [];
                                }
                                $scope.channels[c.exten].push({
                                    name: c.callee_num || c.caller_name
                                    num: c.caller_num
                                })  
                                
                            } else {
                                // outroutin call
                                if (!$scope.channels[c.exten]) {
                                    $scope.channels[c.exten] = [];
                                }
                                $scope.channels[c.exten].push({
                                    name:c.caller_name,
                                    num:c.caller_num

                                })
                            }
                        })
                    }
                })
            }
        }
        $scope.$on('api:TOKEN_SET', $scope.init);

    }
])