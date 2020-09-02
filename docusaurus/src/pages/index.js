import React from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'
import featuredProjectImage from '../../static/img/wwia-screenshot.png'
import mozillaLogo from '../../static/img/mozilla.jpg'
import uberLogo from '../../static/img/uber.jpg'
import airbnbLogo from '../../static/img/airbnb.jpg'




const showcaseData = [
  {
    name: 'Mozilla',
    url: 'talentdirectory.mozilla.org',
    image: mozillaLogo
  },
  {
    name: 'Uber',
    url: 'uber.com/talent',
    image: uberLogo
  },
  {
    name: 'AirBnB',
    url: 'airbnb.com/d/talent',
    image: airbnbLogo
  },
]

const ShowcaseList = ({data}) => {
    return <div className={styles.showcaseList}>
      {data.map(item => <Link key={item.name} href={`https://${item.url}`}>
        <img src={item.image} alt={item.name}/>
        {item.url}
      </Link>)}
    </div>
}

const Home = () => {
  const context = useDocusaurusContext()
  const {siteConfig = {}} = context

  return <Layout
        title="Open Source Talent Board Software"
        description="Set up your own talent board to support people in their quest to find their next opportunity.">

        <main>
          
            <div className={styles.section}>
              <div className={styles.background}></div>

              <div className="container" style={{position:'relative'}}>
                  <div className={styles.intro}>
                    
                      <h1 className={styles.title}><b>Open Source</b> <br/> Talent Board Software</h1>
                      <p className={styles.desc}>Set up your own talent board to support people in finding their next opportunity.</p>
                      <a href="https://github.com/Fortyfive-Tech/weworkin.xyz" target="_blank" rel="noopener"
                        className="button button--lg">
                        Get it now &rarr;
                      </a>
                  </div>
              </div>
            </div>


            <div className={styles.section}>
                <div className="container">
                  <div className={styles.portfolio}>
                    <div className={styles.featuredProject}>
                      <div>
                        <img src={featuredProjectImage}/>
                      </div>
                    </div>

                    <div className={styles.featuredProjectDetails}>
                      <h2>See it in action</h2>
                      <p>WeWorkInAviation.com is a talent board for aviation professionals. </p>
                      <Link className="button button--lg"
                        href="https://weworkinaviation.com">
                        View site &rarr;
                      </Link>
                      <h3>Sites that inspired us</h3>
                      <ShowcaseList data={showcaseData}/>
                    </div>
                  </div>
                </div>
            </div>


            <div className={styles.section}>
              <div className="container">
                <div className={styles.services}>
                  <div className={styles.serviceDetails}>
                    <h2>Talent Board-as-a-service</h2>
                    <p>We will customise, launch and host your talent board for a one-time fee of <strong>€999</strong>.</p>
                    <p>Let us know who you are and what you're looking to do.</p>
                    <Link className="button button--lg"
                        href="mailto:hello@fortyfive.tech">
                        Email us at hello@fortyfive.tech &rarr;
                    </Link>
                  </div>

                  <div className={styles.serviceList}>
                    <h3>What's included</h3>
                    <ol>
                      <li>
                        <div>
                          <img src={useBaseUrl('img/branding.svg')}/>
                        </div>
                        <span>Your custom branding and copy</span>
                      </li>

                      <li>
                        <div>
                          <img src={useBaseUrl('img/testing.svg')}/>
                        </div>
                        <span>Training</span>
                      </li>

                      <li>
                        <div>
                          <img src={useBaseUrl('img/maintenance.svg')}/>
                        </div>
                        <span>Cloud hosting and support for <strong>1 year</strong> <sup>*</sup></span>
                      </li>
                      <li>* Starting month 13, hosting and support cost is $20/month. If you prefer to host it elsewhere, we'll help you migrate.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

        </main>
    </Layout>
}


export default Home
