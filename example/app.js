(function () {

	'use strict';

	angular
		.module('ng-dwDelayInterceptorTest', ['dw-ngDelayInterceptor'])
        .config(DelayInterceptorConfigurator)
        .config(HttpConfigurator)
        .run(Init);
		
        DelayInterceptorConfigurator.$inject = ['dwDelayConfigProvider'];
        HttpConfigurator.$inject = ['$httpProvider'];
        Init.$inject = ['$http'];

        function DelayInterceptorConfigurator(dwDelayConfigProvider) {
		    dwDelayConfigProvider.set({
                delay: 10000
		    });
        }
                    
        function HttpConfigurator($httpProvider) {
            $httpProvider.interceptors.push('dwDelayInterceptor');
        }
		
        function Init($http) {
            
            var requestCount = 0;
            
            var startedAt = new Date();
            // NOTE: We are using the requestCount to alternate between requests
            // that return successfully and requests that return in error.
            $http({
                method: "get",
                url: ( ( ++requestCount % 2 ) ? "./data.json" : "./404.json" )
            })
            // NOTE: We foregoing "resolve" and "reject" because we only care
            // about when the HTTP response comes back - we don't care if it
            // came back in error or in success.
            .finally(
                function handleDone( response ) {
                    var delta = ( ( new Date() ).getTime() - startedAt.getTime() );
                    console.log(delta);
                }
            );
        }
})();
