/*! ngDelayInterceptor - v1.0.0 - 18-05-2016 */
(function() {

	'use strict';

	angular
	.module('dw-ngDelayInterceptor', []);

})();
(function() {

	'use strict';
 
	angular
		.module('dw-ngDelayInterceptor')
		.provider('dwDelayConfig', DelayConfig);
		
	function DelayConfig()
	{
		var values = {
			delay: 800
		};

		var config = {
			set: function(constants) {
				angular.extend(values, constants);
			},
			$get: function () {
				return {
					delay: values.delay
                };
            }
		};
		
		return config;
	}
	
})();
(function() {

	'use strict';
 
	angular
		.module('dw-ngDelayInterceptor')
		.service('dwDelayInterceptor', DelayInterceptor);
		
    DelayInterceptor.$inject = ["$timeout", "$q","dwDelayConfig"];
	
    function DelayInterceptor($timeout, $q,dwDelayConfig) {

        var delayInMilliseconds = dwDelayConfig.delay;
        return({
            response: response,
            responseError: responseError
        });
        function response( response ) {
            var deferred = $q.defer();
            $timeout(
                function() {
                    deferred.resolve( response );
                },
                delayInMilliseconds,
                false
            );
            return( deferred.promise );
        }
        function responseError( response ) {
            var deferred = $q.defer();
            $timeout(
                function() {
                    deferred.reject( response );
                },
                delayInMilliseconds,
                false
            );
            return( deferred.promise );
        }
    }
})();