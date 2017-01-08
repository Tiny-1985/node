'use strict';
const common = require('../common');
const assert = require('assert');

const net = require('net');

const host = '*'.repeat(256);

function do_not_call() {
  throw new Error('This function should not have been called.');
}

const socket = net.connect(42, host, do_not_call);
socket.on('error', common.mustCall(function(err) {
  assert.equal(err.code, 'ENOTFOUND');
}));
socket.on('lookup', function(err, ip, type) {
  assert(err instanceof Error);
  assert.equal(err.code, 'ENOTFOUND');
  assert.equal(ip, undefined);
  assert.equal(type, undefined);
});
