/*global liveJournal */
'use strict';

/**
 * Services that persists and retrieves posts from liveJournal
*/
liveJournal.factory('liveJournalStorage', function ($http) {
	var STORAGE_ID = 'live-journal-posts',
        d = new Date(), requestId;
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    requestId = d.getTime();;
	return {
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},
        getPosts: function () {

            return $http({
                method: "jsonp",
                url: "http://l-api.livejournal.com/__api/",
                params: {
                    "callback": "JSON_CALLBACK",
                    "request" : {
                        "jsonrpc":"2.0",
                        "method":"homepage.get_rating",
                        "params":{
                            "homepage":1,
                            "sort":"visitors",
                            "page":0,
                            "country":"cyr",
                            "locale":"en_US",
                            "category_id":0
                        },
                        "id": requestId
                    }
                }

            });
        },
		put: function (books) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(books));
		}
	};
});
