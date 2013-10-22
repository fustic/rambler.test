/*global liveJournal */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the liveJournalStorage service
 * - exposes the model to the template and provides event handlers
 */
liveJournal.controller('LiveJournalCtrl', function LiveJournalCtrl($scope, $location, liveJournalStorage, filterFilter) {

    var posts;
    $scope.postLimit = 25;
    liveJournalStorage.getPosts().then(function(response){
        if (response && response.status === 200) {
            posts = $scope.posts = response.data.result.rating;
//            console.log(posts);
        }else {
            posts = $scope.posts = [];
        }
    });

});
