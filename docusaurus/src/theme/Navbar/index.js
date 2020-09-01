import React from 'react'
import Link from '@docusaurus/Link'
import styles from './styles.module.css'


const Navbar = () => {
  return <div className={styles.wrapper}>
    <div className="container">
      <div className={styles.inner}>

        <div className={styles.logo}>
          <Link to="/">WeWorkIn.xyz</Link>
        </div>

        <ul className={styles.menu}>
          <li>
            <Link to="/docs">Docs</Link>
          </li>
          <li>
            <a href="https://github.com/Fortyfive-Tech/weworkin.xyz-temp" rel="noopener" target="_blank">GitHub</a>
          </li>
        </ul>

      </div>
    </div>
  </div>
}

export default Navbar