/*global liveJournal */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the liveJournalStorage service
 * - exposes the model to the template and provides event handlers
 */
liveJournal.controller('LiveJournalCtrl', function LiveJournalCtrl($scope, $location, liveJournalStorage, filterFilter) {

    var posts = $scope.posts = [],
        readPosts = $scope.readPosts = liveJournalStorage.getReadPosts(),
        hiddenAuthors = $scope.hiddenAuthors = liveJournalStorage.getHiddenAuthors(),
        showModel = $scope.showModel = liveJournalStorage.getShowModel();

    $scope.postLimit = 25;
    liveJournalStorage.getPosts().then(function(response){
        if (response && response.status === 200) {
            posts = $scope.posts = response.data.result.rating;
            updateRetrievedData();
        }
    });

    $scope.loadMore = function(){
        $scope.postLimit += 25;
    };

    $scope.banAuthor = function(post){
        banAuthor(post, true);
    };
    $scope.unBanAuthor = function(post){
        banAuthor(post, false);
    }

    $scope.unReadPost = function(post){
        readPost(post, false);
    }
    $scope.readPost = function(post){
        readPost(post, true);
    }

    $scope.hideReadPosts = function(){
        showModel["isShowReadPosts"] = false;
        liveJournalStorage.putShowModel(showModel);
        updateRetrievedData();
    }
    $scope.showReadPosts = function(){
        showModel["isShowReadPosts"] = true;
        liveJournalStorage.putShowModel(showModel);
        updateRetrievedData();
    }

    $scope.showBannedAuthor = function(){
        showModel["isShowHiddenAuthors"] = true;
        liveJournalStorage.putShowModel(showModel);
        updateRetrievedData();
    };
    $scope.hideBannedAuthor = function(){
        showModel["isShowHiddenAuthors"] = false;
        liveJournalStorage.putShowModel(showModel);
        updateRetrievedData();
    };


    function readPost(post, setValue){
        post.isRead = setValue;
        readPosts[post.post_id] = setValue;
        liveJournalStorage.putReadPosts(readPosts);
        updatePostVisiblity(post);
    };

    function banAuthor(post, setValue){
        hiddenAuthors[post.journal_id] = setValue;
        liveJournalStorage.putHiddenAuthors(hiddenAuthors);
        updateRetrievedData();
    };
    function updateRetrievedData(){
        $scope.posts.forEach(function(post){
            post.isRead = readPosts[post.post_id];
            post.isHidden = hiddenAuthors[post.journal_id];
            updatePostVisiblity(post);
        });
    }

    function updatePostVisiblity(post){
        var isShowRead = !post.isRead || (post.isRead && showModel.isShowReadPosts),
            isShowHide = !post.isHidden || (post.isHidden && showModel.isShowHiddenAuthors);

        post.isShow = isShowHide && isShowRead;
    }
});
