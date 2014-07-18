/*
 * Copyright 2014 MarkLogic Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var testconfig = require('../test/test-config.js');

var listeners = {
    mode:  'waiting',
    queue: []  
};
function addListener(listener) {
  if (listeners.mode === 'waiting' && listeners.queue.length === 0) {
    listeners.mode = 'running';
    listener();
  } else {
    listeners.queue.push(listener);
  }
};
function notifyListener() {
  if (listeners.queue.length === 0) {
    if (listeners.mode !== 'waiting') {
      listeners.mode = 'waiting';
    }
    return;
  }
  var listener = listeners.queue.shift();
  listener();
};

function succeeded() {
  console.log('done');

  notifyListener();
};
function failed(error) {
  console.log(JSON.stringify(error));

  notifyListener();
};

module.exports = {
    restAdminConnection:  testconfig.restAdminConnection,
    restReaderConnection: testconfig.restReaderConnection,
    restWriterConnection: testconfig.restWriterConnection,
    addListener:          addListener,
    succeeded:            succeeded,
    failed:               failed
};
