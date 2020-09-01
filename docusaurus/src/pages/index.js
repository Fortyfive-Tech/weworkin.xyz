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
        title={`${siteConfig.title}`}
        description="Set up your own talent board to support people in their quest to find their next opportunity.">

        <main>
          
            <div className={styles.section}>
              <div className={styles.background}></div>

              <div className="container" style={{position:'relative'}}>
                  <div className={styles.intro}>
                    
                      <h1 className={styles.title}><b>Open source</b> <br/> talent board software</h1>
                      <p className={styles.desc}>Set up your own talent board to support people in their quest to find their next opportunity.</p>
                      <Link
                        className="button button--lg"
                        to={useBaseUrl('docs/')}>
                        Get it now
                      </Link>
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
                      <h2>WeWorkInAviation</h2>
                      <p>Talent board for aviation professionals looking for their next opportunity. </p>
                      <Link className="button button--lg"
                        href="https://weworkinaviation.com">
                        View Site
                      </Link>
                      <ShowcaseList data={showcaseData}/>
                      <span>Similar Talent Boards that inspired us. </span>
                    </div>
                  </div>
                </div>
            </div>


            <div className={styles.section}>
              <div className="container">
                <div className={styles.services}>
                  <div className={styles.serviceDetails}>
                    <h3>Talent board as a service</h3>
                    <p>Do you want to operate a talent board but don't know how to set it up? </p>
                    <p>Get in touch at hello@fortyfive.tech and let us know who you are and what type of talent board you're looking for.</p>
                    <Link className="button button--lg"
                        href="mailto:hello@fortyfive.tech">
                        Get it Now for €999
                    </Link>
                  </div>

                  <div className={styles.serviceList}>
                    <ol>
                      <li>
                        <div>
                          <img src={useBaseUrl('img/branding.svg')}/>
                        </div>
                        <span>1. Apply your custom branding and copy</span>
                      </li>

                      <li>
                        <div>
                          <img src={useBaseUrl('img/cloud.svg')}/>
                        </div>
                        <span>2. Configure cloud solution</span>
                      </li>

                      <li>
                        <div>
                          <img src={useBaseUrl('img/testing.svg')}/>
                        </div>
                        <span>3. Testing and training</span>
                      </li>

                      <li>
                        <div>
                          <img src={useBaseUrl('img/maintenance.svg')}/>
                        </div>
                        <span>4. Hosting, maintenance and support for 6 months</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

        </main>
    </Layout>
}


export default Home