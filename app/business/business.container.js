'use strict';

import userManager from './user.manager';
import noteManager from './note.manager'


function getter(manager, request) {
  return function () {
    return manager.create(request, this);
  };
}

export default {
    getUserManager: getter(userManager),
    getNoteManager:getter(noteManager)
};
