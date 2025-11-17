
import { Info, Shield, GitBranch } from 'lucide-react';

const SectionWrapper = ({ id, number, title, children }: { id: string, number: string, title: string, children: React.ReactNode }) => (
    <section id={id} className="mb-14 scroll-mt-28">
        <div className="inline-block bg-cream text-ocean font-semibold text-sm py-1.5 px-4 rounded-full mb-3">
            Section {number}
        </div>
        <h2 className="text-4xl font-medium text-navy mb-6">{title}</h2>
        <div className="prose prose-lg max-w-none text-charcoal/90 leading-relaxed text-lg font-light">
            {children}
        </div>
    </section>
);

const SubHeading = ({ title }: { title: string }) => (
    <h3 className="text-2xl font-medium text-navy mt-8 mb-4">{title}</h3>
);

const HighlightBox = ({ children, type = 'info' }: { children: React.ReactNode, type?: 'info' | 'rights' | 'warning' }) => {
    const styles = {
        info: 'bg-cyan-50 border-cyan-400 text-cyan-800',
        rights: 'bg-green-50 border-green-400 text-green-800',
        warning: 'bg-amber-50 border-amber-400 text-amber-800'
    };
    return (
        <div className={`border-l-4 rounded-r-lg p-6 my-6 ${styles[type]}`}>
            {children}
        </div>
    )
}

export function PrivacyContent() {
  return (
    <article>
        <SectionWrapper id="info-collect" number="1" title="Information We Collect">
            <p>We collect information that you provide directly to us, information we obtain automatically when you use our services, and information from third-party sources.</p>
            
            <SubHeading title="1.1 Information You Provide" />
            <p>When you create an account, join our waitlist, or interact with our services, you may provide:</p>
            <ul>
                <li><strong>Account Information:</strong> Name, email address, password, and profile picture</li>
                <li><strong>Waitlist Information:</strong> Your use case description, referral source, and communication preferences</li>
                <li><strong>Payment Information:</strong> Payment card details and billing address (when you subscribe to paid plans)</li>
                <li><strong>Communications:</strong> Information you provide when you contact us for support, feedback, or inquiries</li>
                <li><strong>Optional Information:</strong> Company name, role, country, and other profile details you choose to share</li>
            </ul>

            <SubHeading title="1.2 Information Collected Automatically" />
            <p>When you use Lumivex, we automatically collect:</p>
            <ul>
                <li><strong>Device Information:</strong> Device type, operating system, browser type, IP address, and unique device identifiers</li>
                <li><strong>Usage Information:</strong> Pages viewed, features used, time spent, click patterns, and interactions with our platform</li>
                <li><strong>Location Information:</strong> General location based on IP address (city and country level, not precise location)</li>
                <li><strong>Cookies and Similar Technologies:</strong> Information collected through cookies, web beacons, and similar tracking technologies</li>
            </ul>

            <SubHeading title="1.3 Information from Third Parties" />
            <p>We may receive information from:</p>
            <ul>
                <li><strong>Authentication Providers:</strong> When you sign in with Google, we receive your name, email, and profile picture from Google</li>
                <li><strong>Analytics Providers:</strong> Aggregated usage statistics and performance data</li>
                <li><strong>Referral Partners:</strong> Information when you're referred by another user</li>
            </ul>
        </SectionWrapper>

        <SectionWrapper id="info-use" number="2" title="How We Use Your Information">
            <p>We use the information we collect for the following purposes:</p>
            <SubHeading title="2.1 To Provide Our Services" />
            <ul>
                <li>Create and manage your account</li>
                <li>Enable you to join our waitlist and track your position</li>
                <li>Process and fulfill your requests</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send you transactional emails (account creation, waitlist confirmation, referral notifications)</li>
            </ul>

            <SubHeading title="2.2 To Improve Our Services" />
            <ul>
                <li>Analyze how users interact with our platform</li>
                <li>Identify and fix technical issues</li>
                <li>Develop new features and improve existing functionality</li>
                <li>Conduct research and analytics to enhance user experience</li>
            </ul>

            <SubHeading title="2.3 To Communicate With You" />
            <ul>
                <li>Send product updates and announcements (if you've opted in)</li>
                <li>Notify you about your waitlist position and referral activity</li>
                <li>Share important service-related information</li>
                <li>Respond to your comments and questions</li>
            </ul>
            
            <SubHeading title="2.4 For Marketing Purposes" />
            <ul>
                <li>Send promotional emails about new features, special offers, and content (with your consent)</li>
                <li>Display personalized content based on your interests</li>
                <li>Run contests, promotions, and surveys</li>
            </ul>
            <HighlightBox type="info">
                You can opt out of marketing communications at any time by clicking "unsubscribe" in our emails or updating your preferences in your account settings.
            </HighlightBox>

            <SubHeading title="2.5 For Security and Legal Compliance" />
            <ul>
                <li>Detect, prevent, and address fraud, security issues, and technical problems</li>
                <li>Protect the rights, property, and safety of Lumivex, our users, and the public</li>
                <li>Comply with legal obligations and enforce our Terms of Service</li>
                <li>Respond to legal requests from government authorities</li>
            </ul>
        </SectionWrapper>
        
        <SectionWrapper id="info-share" number="3" title="How We Share Your Information">
            <p>We do not sell your personal information. We may share your information in the following circumstances:</p>

            <SubHeading title="3.1 With Your Consent" />
            <p>We share your information when you explicitly consent, such as when you choose to share your referral code with friends.</p>

            <SubHeading title="3.2 Service Providers" />
            <p>We work with third-party service providers who perform services on our behalf:</p>
            <ul>
                <li><strong>Hosting Providers:</strong> Firebase/Google Cloud Platform for data storage and infrastructure</li>
                <li><strong>Email Services:</strong> To send transactional and marketing emails</li>
                <li><strong>Analytics Services:</strong> To understand how our services are used</li>
                <li><strong>Payment Processors:</strong> To process subscription payments securely</li>
            </ul>
            <p>These providers are contractually obligated to protect your information and use it only for the purposes we specify.</p>

            <SubHeading title="3.3 Business Transfers" />
            <p>If Lumivex is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website before your information is transferred and becomes subject to a different privacy policy.</p>

            <SubHeading title="3.4 Legal Requirements" />
            <p>We may disclose your information if required by law or in response to:</p>
            <ul>
                <li>Valid legal requests from government authorities</li>
                <li>Court orders or subpoenas</li>
                <li>Protection of our legal rights or the safety of others</li>
                <li>Investigation of fraud or security issues</li>
            </ul>

            <SubHeading title="3.5 Aggregated and De-Identified Data" />
            <p>We may share aggregated or de-identified information that cannot reasonably be used to identify you. For example, we may share statistics about waitlist growth or platform usage publicly.</p>
        </SectionWrapper>

        <SectionWrapper id="cookies" number="4" title="Cookies and Tracking Technologies">
            <p>We use cookies and similar technologies to provide, improve, and understand our services.</p>

            <SubHeading title="4.1 What Are Cookies?" />
            <p>Cookies are small text files stored on your device that help us recognize you and remember your preferences.</p>

            <SubHeading title="4.2 Types of Cookies We Use" />
            <ul>
                <li><strong>Essential Cookies:</strong> Required for the website to function (authentication, security)</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our services (Firebase Analytics, Google Analytics)</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing Cookies:</strong> Track your activity for advertising purposes (if you've consented)</li>
            </ul>

            <SubHeading title="4.3 Your Cookie Choices" />
            <p>You can control cookies through your browser settings. However, disabling essential cookies may affect your ability to use certain features of our platform.</p>
            <p>To opt out of analytics tracking, you can:</p>
            <ul>
                <li>Use browser privacy settings</li>
                <li>Install browser extensions like Privacy Badger</li>
                <li>Visit our Cookie Settings page (link in footer)</li>
            </ul>
        </SectionWrapper>

        <SectionWrapper id="data-security" number="5" title="Data Security">
            <p>We implement appropriate technical and organizational measures to protect your information.</p>
            
            <SubHeading title="5.1 Security Measures" />
            <ul>
                <li><strong>Encryption:</strong> All data transmitted between your browser and our servers is encrypted using TLS 1.3</li>
                <li><strong>Data Storage:</strong> Your data is stored in secure, encrypted databases on Firebase/Google Cloud Platform</li>
                <li><strong>Access Controls:</strong> We limit access to your information to employees and contractors who need it to perform their jobs</li>
                <li><strong>Regular Security Audits:</strong> We conduct regular security assessments and penetration testing</li>
                <li><strong>Compliance:</strong> We maintain SOC 2 Type II certification and comply with industry security standards</li>
            </ul>

            <SubHeading title="5.2 Your Responsibility" />
            <p>While we take security seriously, you also play a role:</p>
            <ul>
                <li>Keep your password secure and don't share it with others</li>
                <li>Use a strong, unique password for your Lumivex account</li>
                <li>Enable two-factor authentication (when available)</li>
                <li>Log out of your account when using shared devices</li>
                <li>Report any suspicious activity immediately to security@lumivex.com</li>
            </ul>

            <SubHeading title="5.3 Data Breach Notification" />
            <HighlightBox type="warning">
                In the unlikely event of a data breach affecting your personal information, we will notify you via email within 72 hours and provide information about the breach and steps you can take to protect yourself.
            </HighlightBox>
        </SectionWrapper>

        <SectionWrapper id="privacy-rights" number="6" title="Your Privacy Rights">
             <p>Depending on your location, you may have certain rights regarding your personal information.</p>
            <HighlightBox type="rights">
                <p className='font-semibold mb-2'>How to Exercise Your Rights</p>
                <p>To exercise any of these rights, contact us at:</p>
                <ul className="!mt-2 !list-none !pl-0">
                    <li>Email: <a href="mailto:privacy@lumivex.com" className="text-green-700 hover:underline">privacy@lumivex.com</a></li>
                    <li>Privacy Request Form: <a href="#" className="text-green-700 hover:underline">lumivex.com/privacy-request</a></li>
                </ul>
                <p className='mt-2'>We will respond to your request within 30 days.</p>
            </HighlightBox>

            <SubHeading title="6.1 Access and Portability" />
            <ul>
                <li><strong>Right to Access:</strong> You can request a copy of the personal information we hold about you.</li>
                <li><strong>Right to Data Portability:</strong> You can request your data in a structured, machine-readable format.</li>
            </ul>

            <SubHeading title="6.2 Correction and Deletion" />
            <ul>
                <li><strong>Right to Correction:</strong> You can update inaccurate or incomplete information in your account settings.</li>
                <li><strong>Right to Deletion:</strong> You can request deletion of your account and personal information.</li>
            </ul>
            <p>To delete your account:</p>
            <ol>
                <li>1. Go to Account Settings</li>
                <li>2. Click "Delete Account"</li>
                <li>3. Confirm deletion (this action is permanent)</li>
            </ol>
            
            <SubHeading title="6.3 Marketing Preferences" />
            <ul>
                <li><strong>Right to Opt-Out:</strong> You can unsubscribe from marketing emails at any time.</li>
                <li><strong>Communication Preferences:</strong> Manage your email preferences in Account Settings.</li>
            </ul>

            <SubHeading title="6.4 Additional Rights (For EU/UK Residents)" />
            <p>If you're in the EU or UK, you have additional rights under GDPR:</p>
            <ul>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your information.</li>
                <li><strong>Right to Object:</strong> Object to processing based on legitimate interests.</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for processing at any time.</li>
                <li><strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection authority.</li>
            </ul>

             <SubHeading title="6.5 California Residents" />
            <p>If you're a California resident, you have rights under CCPA:</p>
            <ul>
                <li>Right to know what personal information is collected.</li>
                <li>Right to know if your information is sold or disclosed.</li>
                <li>Right to opt-out of sale of personal information (we don't sell your information).</li>
                <li>Right to non-discrimination for exercising your rights.</li>
            </ul>
        </SectionWrapper>
        
        <SectionWrapper id="children-privacy" number="7" title="Children's Privacy">
            <p>Lumivex is not intended for children under 13 years of age (or under 16 in the EU).</p>
            <ul>
                <li>We do not knowingly collect personal information from children.</li>
                <li>If you're under 13/16, do not use our services or provide any information.</li>
                <li>If we learn we've collected information from a child, we will delete it immediately.</li>
            </ul>
            <p>If you believe we've collected information from a child, please contact us at <a href="mailto:privacy@lumivex.com">privacy@lumivex.com</a>.</p>
        </SectionWrapper>
        
        <SectionWrapper id="data-transfers" number="8" title="International Data Transfers">
            <p>Lumivex is based in the United States, and your information may be transferred to and processed in countries other than your own.</p>
            <ul>
                <li><strong>Data Storage:</strong> Your data is primarily stored on servers in the United States (Firebase/Google Cloud).</li>
                <li><strong>Adequate Protections:</strong> We use Standard Contractual Clauses and other legal mechanisms to ensure your data is protected.</li>
                <li><strong>EU-US Data Transfers:</strong> We comply with applicable data transfer regulations.</li>
            </ul>
             <HighlightBox type='info'>By using Lumivex, you consent to the transfer of your information to countries that may have different data protection laws than your jurisdiction.</HighlightBox>
        </SectionWrapper>
        
        <SectionWrapper id="third-party" number="9" title="Third-Party Services">
            <p>Our website and services may contain links to third-party websites, services, and integrations.</p>
            <SubHeading title="9.1 Third-Party Links" />
            <ul>
                <li>We are not responsible for the privacy practices of third-party websites.</li>
                <li>We encourage you to read their privacy policies before providing any information.</li>
                <li>Links to third parties do not imply endorsement.</li>
            </ul>

            <SubHeading title="9.2 Third-Party Integrations" />
            <p>When you connect third-party services (like Google Drive, Slack, etc.) to Lumivex:</p>
            <ul>
                <li>You authorize us to access specific information from those services.</li>
                <li>The third party's privacy policy governs their collection and use of your information.</li>
                <li>You can revoke access at any time in your Account Settings.</li>
            </ul>

            <SubHeading title="9.3 Third-Party Services We Use" />
            <ul>
                <li><strong>Google:</strong> Authentication, analytics, cloud infrastructure</li>
                <li><strong>Firebase:</strong> Database, hosting, authentication</li>
                <li><strong>Stripe:</strong> Payment processing (if applicable)</li>
                <li><strong>SendGrid/Mailchimp:</strong> Email delivery</li>
            </ul>
        </SectionWrapper>
        
        <SectionWrapper id="data-retention" number="10" title="Data Retention">
            <p>We retain your information for as long as necessary to provide our services and comply with legal obligations.</p>
            
            <SubHeading title="10.1 Active Accounts" />
            <ul>
                <li><strong>Account information:</strong> Retained while your account is active.</li>
                <li><strong>Usage data:</strong> Retained for up to 2 years for analytics purposes.</li>
                <li><strong>Communication records:</strong> Retained for up to 3 years for support purposes.</li>
            </ul>

            <SubHeading title="10.2 Closed Accounts" />
            <ul>
                <li>When you delete your account, we delete or anonymize your personal information within 30 days.</li>
                <li>Some information may be retained for legal compliance (e.g., financial records for tax purposes).</li>
                <li>Anonymized data may be retained indefinitely for research and improvement.</li>
            </ul>
            
            <SubHeading title="10.3 Inactive Accounts" />
            <ul>
                <li>If you haven't logged in for 3 years, we may delete your account and data after notifying you via email.</li>
                <li>You have 30 days to reactivate your account before deletion.</li>
            </ul>
        </SectionWrapper>
        
        <SectionWrapper id="changes" number="11" title="Changes to This Policy">
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.</p>
            
            <SubHeading title="11.1 How We Notify You" />
            <ul>
                <li>We will post the updated policy on this page.</li>
                <li>We will update the "Last Updated" date at the top.</li>
                <li>For material changes, we will notify you via Email (to your registered email address), a prominent notice on our website, or an in-app notification.</li>
            </ul>

            <SubHeading title="11.2 Your Continued Use" />
            <p>By continuing to use Lumivex after we post changes, you accept the updated Privacy Policy. If you don't agree with the changes, please stop using our services and close your account.</p>
        </SectionWrapper>

        <SectionWrapper id="contact" number="12" title="Contact Us">
            <p>If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:</p>
            <ul>
                <li><strong>Email:</strong> <a href="mailto:privacy@lumivex.com">privacy@lumivex.com</a></li>
                <li><strong>General Inquiries:</strong> <a href="mailto:hello@lumivex.com">hello@lumivex.com</a></li>
                <li><strong>Mailing Address:</strong>
                    <address className="not-italic mt-2">
                        Lumivex Inc.<br />
                        123 Innovation Drive<br />
                        Tech City, CA 94105<br />
                        United States
                    </address>
                </li>
                 <li><strong>Data Protection Officer (DPO):</strong> <a href="mailto:dpo@lumivex.com">dpo@lumivex.com</a></li>
                 <li><strong>Privacy Request Form:</strong> <a href="#">lumivex.com/privacy-request</a></li>
            </ul>
            <p>We will respond to your inquiry within 30 days.</p>
        </SectionWrapper>
    </article>
  );
}
