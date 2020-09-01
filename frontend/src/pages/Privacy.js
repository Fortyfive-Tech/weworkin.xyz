import React from 'react'
import styled from 'styled-components'
import settings from '../config/settings.json'

const PrivacyPage = () => {
    return <Wrapper>
        <h1>Data Privacy Policy</h1>
        <p>The privacy of your data -- and it is your data -- is a big deal to us, {settings.companyName}.</p>

        <h2>What we collect and why</h2>
        <p>Our guiding principle is to collect only what we need. Here's what that means in practice:</p>
        <h3>Personal information</h3>
        <p>When you register for our website, you submit a set of personal information that you accept to be shown publicly on the website. This information includes your name, location and other professional details. Your email is stored in our database securely but never shown publicly nor shared with any other third-party.</p>
        <h3>Website interactions</h3>
        <p>When you browse our website, your browser automatically shares certain information such as which operating system and browser version you are using. We track that information, along with the pages you are visiting, page load timing, and which website referred you for statistical purposes like conversion rates and to test new designs. We sometimes track specific link clicks to help inform some design decisions. These web analytics data are tied to your IP address anonymously. We use Google Analytics as the only tracking/analytics tool on this website.</p>
        <h3>Cookies and Do Not Track</h3>
        <p>You can adjust cookie retention settings in your own browser. To learn more about cookies, including how to view which cookies have been set and how to manage and delete them, please visit: www.allaboutcookies.org. Our website responds to Do Not Track beacons sent by browser plugins.</p>
        <h3>Information we do not collect</h3>
        <p>We don’t collect any characteristics of protected classifications including age, race, gender, religion, sexual orientation, gender identity, gender expression, or physical and mental abilities or disabilities. You may provide these data voluntarily, such as if you include a pronoun preference in your email signature when writing to us.
        <br />We also do not collect any biometric data.</p>

        <h2>Location of Site and Data</h2>
        <p>Our website is hosted in Germany, EU. If you are located outside the European Union, please be aware that any information you provide to us will be transferred to the EU. By using this website, participating in any of our services and/or providing us with your information, you consent to this transfer.</p>

        <h2>Your Rights With Respect to Your Information</h2>
        <p>We apply the same data rights to all users, regardless of their location. The most privacy-forward regulations in place are the European Union’s General Data Protection Regulation (“GDPR”), which this website recognizes. These rights include:</p>
        <ul>
            <li>Right to Know. You have the right to know what personal information is collected, used, shared or sold. We outline both the categories and specific bits of data we collect, as well as how they are used, in this privacy policy.</li>
            <li>Right of Access. This includes your right to access the personal information we gather about you, and your right to obtain information about the sharing, storage, security and processing of that information.</li>
            <li>Right to Correction. You have the right to request correction of your personal information.</li>
            <li>Right to Erasure / “To be Forgotten”. This is your right to request, subject to certain limitations under applicable law, that your personal information be erased from our possession and, by extension, all of our service providers. Fulfillment of some data deletion requests may prevent you from using the services provided by this website because the profile information would be incomplete. In such cases, a data deletion request may result in removal of your profile from the website.</li>
            <li>Right to Complain. You have the right to make a complaint regarding our handling of your personal information with the appropriate supervisory authority. To identify your specific authority or find out more about this right, EU individuals should go to https://edpb.europa.eu/about-edpb/board/members_en.</li>
            <li>Right to Restrict Processing. This is your right to request restriction of how and why your personal information is used or processed, including opting out of sale of personal information. (Again: we never have and never will sell your personal data).</li>
            <li>Right to Object. You have the right, in certain situations, to object to how or why your personal information is processed.</li>
            <li>Right to Portability. You have the right to receive the personal information we have about you and the right to transmit it to another party.</li>
            <li>Right to not be subject to Automated Decision-Making. You have the right to object and prevent any decision that could have a legal, or similarly significant, effect on you from being made solely based on automated processes. This right is limited, however, if the decision is necessary for performance of any contract between you and us, is allowed by applicable law, or is based on your explicit consent.</li>
        </ul>

        <h2>How we secure your data</h2>
        <p>All data is encrypted via SSL/TLS when transmitted from our servers to your browser. The database backups are also encrypted.</p>

        <h2>We commit to resolving all complaints</h2>
        <p>In compliance with the EU Privacy Principles, we commit to resolve complaints about your privacy and our collection or use of your personal information. Individuals with inquiries or complaints regarding this privacy policy should contact {settings.companyName} at {settings.contactEmail}.
        </p>

        <h2>Questions?</h2>
        <p>Do you have any questions, comments, or concerns about this privacy policy, your data, or your rights with respect to your information? Please get in touch by emailing us at {settings.contactEmail} and we’ll be happy to answer them!</p>
    </Wrapper>
}

const Wrapper = styled.div`
    width: 75%;
    margin-bottom: 3rem;
`

export default PrivacyPage
