/*global liveJournal */
'use strict';

/**
 * Services that persists and retrieves posts from liveJournal
*/
liveJournal.factory('liveJournalStorage', function ($http) {
	var STORAGE_ID = 'live-journal-posts',
        READ_POSTS_ID = 'live-journal-read-posts',
        HIDDEN_AUTH_ID = 'live-journal-hidden-authors',
        SHOW_MODEL_ID = 'live-journal-show-model',
        d = new Date(), requestId;
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    requestId = d.getTime();

    function loadFromStorage(storageID){
        return JSON.parse(localStorage.getItem(storageID) || '{}');
    };
    function saveToStorage(storageID, entries){
        localStorage.setItem(storageID, JSON.stringify(entries));
    }
	return {
		get: function () {
			return loadFromStorage(STORAGE_ID);
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
        getReadPosts: function(){
            return loadFromStorage(READ_POSTS_ID);
        },
        putReadPosts: function(posts){
            saveToStorage(READ_POSTS_ID, posts);
        },
        getHiddenAuthors: function(){
            return loadFromStorage(HIDDEN_AUTH_ID);
        },
        putHiddenAuthors: function(authors){
            saveToStorage(HIDDEN_AUTH_ID, authors);
        },
        getShowModel: function(){
            var model = loadFromStorage(SHOW_MODEL_ID);
            return Object.getOwnPropertyNames(model).length === 0 ? {
                isShowReadPosts: false,
                isShowHiddenAuthors: false
            } : model;
        },
        putShowModel: function(model){
            saveToStorage(SHOW_MODEL_ID, model);
        }
	};
});
