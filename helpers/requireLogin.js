/*
 * @providesModule requireLogin
 */

'use strict';

function requireLogin(Component) {
  // todo: this mutates the component, probably better to find a better way
  Component.requireLogin = true;
  return Component;
}

export default requireLogin;