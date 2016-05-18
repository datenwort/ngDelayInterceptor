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