angular.module('voxity.contacts', [
    'voxity.core',
]);

angular.module('voxity.contacts').config(['$routeProvider',
    function(rp) {
        rp.when('/contacts', {
            templateUrl: 'views/contacts/list.html',
            controller: 'contactsCtrl'
        }).when('/contacts/add', {
            templateUrl: 'views/contacts/form.html',
            controller: 'contactFormCtrl'
        }).when('/contact/:contactId/edit', {
            templateUrl: 'views/contacts/form.html',
            controller: 'contactFormCtrl'
        }).when('/contact/:contactId', {
            templateUrl: 'views/contacts/detail.html',
            controller: 'contactCtrl'
        })
    }
])

angular('voxity.contacts').provider('vxtContactsConf', [function () {
    
    //Temps de stockage dans l'application en secondes
    // par défaut 5 minutes
    this.storedDataTime = 5 * 60;

    this.startPath = '/contacts';

    this.$get = [function() {
        return this
    }];
}])