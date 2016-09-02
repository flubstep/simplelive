/*
 * @providesModule renderTime
 */

'use strict';

function renderTime(t) {
  let s = Math.floor(t);
  let minutes = Math.floor(s / 60);
  let seconds = s % 60;
  let lfill = (seconds < 10) ? '0': '';
  return minutes + ':' + lfill + seconds;
}

export default renderTime;