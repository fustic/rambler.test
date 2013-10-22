/*global lJournal */
'use strict';

/**
 * Services that retrieves posts from LJ
*/

journal.factory('journalStorage', function ($scope, $http) {
	var STORAGE_ID = 'journal-angularjs-perf';

	return {
		get: function () {
//			console.log($scope, $http);
//            return [];
            return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		put: function () {
			localStorage.setItem(STORAGE_ID, JSON.stringify());
		}
	};
});
