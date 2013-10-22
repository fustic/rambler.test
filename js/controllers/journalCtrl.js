/*global lJournal */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the lJournalStorage service
 * - exposes the model to the template and provides event handlers
 */

journal.controller("JournalCtrl", function JournalCtrl($scope, $location, journalStorage, filterFilter) {

    var s = journalStorage.get();
    debugger;
});