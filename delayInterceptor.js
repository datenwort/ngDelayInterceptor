(function() {

	'use strict';
 
	angular
		.module('dw-ngDelayInterceptor')
		.service('dwDelayInterceptor', DelayInterceptor);
		
    DelayInterceptor.$inject = ["$timeout", "$q","dwDelayConfig"];
	
    function DelayInterceptor($timeout, $q,dwDelayConfig) {

        var delayInMilliseconds = dwDelayConfig.delay;
        
        // Return our interceptor configuration.
        return({
            response: response,
            responseError: responseError
        });

        // ---
        // PUBLIC METHODS.
        // ---
        // I intercept successful responses.
        function response( response ) {
            var deferred = $q.defer();
            $timeout(
                function() {
                    deferred.resolve( response );
                },
                delayInMilliseconds,
                // There's no need to trigger a $digest - the view-model has
                // not been changed.
                false
            );
            return( deferred.promise );
        }

        // I intercept error responses.
        function responseError( response ) {
            var deferred = $q.defer();
            $timeout(
                function() {
                    deferred.reject( response );
                },
                delayInMilliseconds,
                // There's no need to trigger a $digest - the view-model has
                // not been changed.
                false
            );
            return( deferred.promise );
        }
    }
})();