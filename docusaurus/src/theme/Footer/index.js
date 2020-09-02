/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import styles from './styles.module.css';

const Footer = () => {
  return <footer className={styles.footer}>
      Made with ❤️ in&nbsp;
      <a href="https://goo.gl/maps/ZTEUrCvDWmgqMkv77" target="_blank" rel="noopener">Cluj-Napoca</a>, by&nbsp;
      <a href="https://fortyfive.tech" target="_blank" rel="noopener">Fortyfive</a>
  </footer>
}

export default Footer