/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { cleanDir } from './lib/fs';
const srcDistPath = '../lib';
/**
 * Cleans up the output (build) directory.
 */
function clean() {
  return Promise.all([
    cleanDir(srcDistPath + '/*', {
      nosort: true,
      dot: true,
      ignore: [],
    })
  ]);
}

export default clean;
