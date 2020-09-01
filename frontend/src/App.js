import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import { ToastContainer, Slide } from 'react-toastify'
import {
  Router,
  Switch,
  Route,
} from "react-router-dom"
import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga'
import {Cookies} from 'react-cookie-consent'


import Header from './components/Header'
import { theme, GlobalStyle } from './config/theme'
import { LayoutWrapper } from './components/layout/wrappers'
import Footer from './components/Footer'
import Home from './pages/Home'
import PrivacyPage from './pages/Privacy'
import RegisterPage from './pages/Register'
import ScrollToTop from './components/ScrollToTop'
import ConsentPopup from './components/ConsentPopup'
import Error404Page from './pages/Error404Page'


// Only process with GA if the user already has given consent (has the consent cookie in store)
const history = createBrowserHistory()
if(Cookies.get(process.env.REACT_APP_CONSENT_COOKIE_NAME) === 'true') {
  // Send a pageview on init
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID)
  ReactGA.pageview(window.location.pathname + window.location.search)

  // Send pageviews on every history change
  history.listen(location => {
      ReactGA.set({ page: location.pathname })
      ReactGA.pageview(location.pathname)
  })
}

const App = () => {

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache()
  })

  return (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ApolloProvider client={client}>

          <Router history={history}>
              <ScrollToTop />

              <Header/>

              <LayoutWrapper>
                  <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/privacy" component={PrivacyPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="*" component={Error404Page}/>
                  </Switch>
              </LayoutWrapper>

              <Footer/>
              <ConsentPopup/>
          </Router>

      </ApolloProvider>
      <ToastContainer 
        position="bottom-center"
        autoClose={2000}
        transition={Slide}
        hideProgressBar
      />

      
    </ThemeProvider> 
  )
}

export default App