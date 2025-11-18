
import { Info, AlertTriangle } from 'lucide-react';

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

const HighlightBox = ({ children, type = 'info' }: { children: React.ReactNode, type?: 'info' | 'legal' }) => {
    const styles = {
        info: 'bg-cyan-50 border-cyan-400 text-cyan-800',
        legal: 'bg-amber-50 border-amber-400 text-amber-800'
    };
    const Icon = type === 'legal' ? AlertTriangle : Info;
    
    return (
        <div className={`border-l-4 rounded-r-lg p-6 my-6 ${styles[type]} flex gap-4`}>
            <Icon className="h-6 w-6 mt-1 flex-shrink-0" />
            <div>{children}</div>
        </div>
    )
}

const SimpleTermsBox = ({ summary }: { summary: React.ReactNode }) => (
    <div className="bg-cyan-50 border-none rounded-xl p-6 my-6">
        <h4 className="font-semibold text-navy text-base mb-2 flex items-center gap-2"><Info className="h-5 w-5 text-cyan"/>In Simple Terms:</h4>
        <div className="text-charcoal/90 text-base">{summary}</div>
    </div>
);

export function TermsContent() {
  return (
    <article>
        <SectionWrapper id="acceptance" number="1" title="Acceptance of Terms">
            <p>By accessing or using the Lumivex platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service.</p>
            <SubHeading title="Effective Date" />
            <p>These Terms are effective as of the date you first access the Service.</p>
            <SubHeading title="Binding Agreement" />
            <p>These Terms constitute a legally binding agreement between you and Lumivex Inc. ("Lumivex," "we," "us," or "our").</p>
            <SubHeading title="Updates" />
            <p>We reserve the right to modify these Terms at any time. Your continued use of the Service after changes are posted constitutes acceptance of the updated Terms.</p>
        </SectionWrapper>

        <SectionWrapper id="eligibility" number="2" title="Eligibility">
            <SubHeading title="2.1 Age Requirements" />
            <p>You must be at least 18 years old to use Lumivex. If you are under 18, you may not create an account or use our services. For users in the European Union, you must be at least 16 years old.</p>
            <SubHeading title="2.2 Legal Capacity" />
            <p>By using Lumivex, you represent and warrant that you have the legal capacity to enter into binding contracts, you are not prohibited from using the Service under applicable laws, and you will comply with these Terms and all applicable laws and regulations.</p>
            <SubHeading title="2.3 Geographic Restrictions" />
            <p>Our Service may not be available in all countries. We reserve the right to restrict access to the Service in certain jurisdictions.</p>
        </SectionWrapper>

        <SectionWrapper id="account" number="3" title="Account Registration">
             <SimpleTermsBox summary={<p>You need an account to use most features. Keep your login details safe, be honest with your information, and don't share your account.</p>} />
            <SubHeading title="3.1 Creating an Account" />
            <p>To access certain features of the Service, you must create an account by providing your full name, a valid email address, a secure password, and any additional information we may request. You may also register using third-party authentication services (e.g., Google).</p>
            <SubHeading title="3.2 Account Security" />
            <p>You are responsible for maintaining the confidentiality of your account credentials, all activities that occur under your account, and notifying us immediately of any unauthorized access or security breach.</p>
            <HighlightBox type="legal">You must not share your account credentials with anyone. Lumivex will never ask for your password via email or phone.</HighlightBox>
            <SubHeading title="3.3 Account Information Accuracy" />
            <p>You agree to provide accurate, current, and complete information, update your information promptly if it changes, not impersonate any person or entity, and not create multiple accounts without authorization.</p>
            <SubHeading title="3.4 Account Termination" />
            <p>We reserve the right to suspend or terminate your account if you violate these Terms, provide false or misleading information, your account is inactive for more than 3 years, or we are required to do so by law.</p>
        </SectionWrapper>
        
        <SectionWrapper id="responsibilities" number="4" title="User Responsibilities">
            <SubHeading title="4.1 Lawful Use" />
            <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You will not use the Service to violate any local, state, national, or international law, infringe upon the rights of others, or engage in fraudulent or deceptive practices.</p>
            <SubHeading title="4.2 Account Conduct" />
            <p>You are solely responsible for your interactions with other users, the content you create, upload, or share, any AI agents you build and deploy using our platform, and compliance with applicable laws in your jurisdiction.</p>
            <SubHeading title="4.3 Security Obligations" />
            <p>You must keep your password secure and confidential, use two-factor authentication when available, log out from shared or public devices, and report suspicious activity immediately.</p>
        </SectionWrapper>

        <SectionWrapper id="waitlist" number="5" title="Waitlist and Referral Program">
            <SubHeading title="5.1 Waitlist Participation" />
            <p>Lumivex is currently in development. By joining the waitlist, you express interest in early access, agree to receive updates, and understand that access is not guaranteed until official launch. Joining the waitlist does not guarantee access to the Service or any specific features, pricing, or benefits.</p>
            <SubHeading title="5.2 Referral Code System" />
            <p>Upon joining the waitlist, you receive a unique referral code. You may share this code with others. When someone uses your code to join, both parties may receive benefits like position improvements, badge upgrades, and potential early access or pricing benefits.</p>
            <p>Referral benefits have no monetary value and cannot be exchanged for cash or transferred. You may only use one referral code when joining and cannot use your own.</p>
            <SubHeading title="5.3 Prohibited Referral Practices" />
            <p>You may not create multiple accounts to game the referral system, use automated bots, purchase or sell referral codes, engage in spam, or misrepresent Lumivex. Violations may result in removal from the waitlist, revocation of benefits, or a ban.</p>
            <SubHeading title="5.4 Modification of Referral Program" />
            <p>We reserve the right to modify or discontinue the referral program, change benefits, or disqualify referrals that violate our policies at any time.</p>
        </SectionWrapper>
        
        <SectionWrapper id="usage" number="6" title="Platform Access and Usage">
            <SimpleTermsBox summary={<p>We give you permission to use Lumivex for your own purposes, but you can't copy it, reverse-engineer it, or use it to build a competitor.</p>} />
            <SubHeading title="6.1 License Grant" />
            <p>Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your personal or internal business purposes.</p>
            <SubHeading title="6.2 Restrictions" />
            <p>You may not modify, copy, create derivative works of, reverse engineer, decompile, or disassemble any part of the Service, remove proprietary notices, or interfere with the Service.</p>
            <SubHeading title="6.3 Beta Access (When Available)" />
            <p>If you receive beta access, the Service may contain bugs, features may change, and your use is at your own risk. You agree to provide feedback and not publicly disclose information about beta features without permission.</p>
        </SectionWrapper>
        
        <SectionWrapper id="ip" number="7" title="Intellectual Property Rights">
             <SimpleTermsBox summary={<p>We own our platform, logos, and content. You can't use them without our permission. If you give us feedback, we're free to use it.</p>} />
            <SubHeading title="7.1 Lumivex Ownership" />
            <p>All rights, title, and interest in and to the Service (software, design, branding, content) are owned exclusively by Lumivex or our licensors.</p>
            <SubHeading title="7.2 Limited License" />
            <p>Nothing in these Terms grants you any right to use our trademarks or branding without written permission, copy our content, or claim ownership of any part of the Service.</p>
            <SubHeading title="7.3 Feedback" />
            <p>If you provide feedback, you grant us a worldwide, perpetual, royalty-free license to use it. We have no obligation to implement your suggestions or compensate you for them.</p>
        </SectionWrapper>
        
        <SectionWrapper id="user-content" number="8" title="User Content">
             <SimpleTermsBox summary={<p>You own the content you create. We can use it to provide our service to you, but we won't sell it or claim ownership. You're responsible for making sure your content doesn't violate anyone else's rights.</p>} />
            <SubHeading title="8.1 Your Content" />
            <p>"User Content" means any content you submit, upload, or create using the Service, including AI agents you build, prompts, data, and communications.</p>
            <SubHeading title="8.2 Ownership" />
            <p>You retain ownership of your User Content. By using the Service, you grant Lumivex a worldwide, non-exclusive, royalty-free license to use, store, and process your User Content as necessary to provide the Service, and the right to use anonymized, aggregated data for analytics.</p>
            <SubHeading title="8.3 Responsibility for Content" />
            <p>You are solely responsible for the accuracy and legality of your User Content, ensuring you have the rights to use it, and any consequences arising from your AI agents' actions.</p>
            <SubHeading title="8.4 Prohibited Content" />
            <p>You may not upload content that violates laws, infringes on rights, contains malware, is obscene, or promotes illegal activities.</p>
            <SubHeading title="8.5 Content Removal" />
            <p>We reserve the right to remove User Content that violates these Terms, is reported by others, or is required by law.</p>
        </SectionWrapper>
        
        <SectionWrapper id="prohibited" number="9" title="Prohibited Activities">
            <p>You expressly agree not to engage in illegal activities, harmful activities (harassment, spam), system abuse (hacking, viruses), unauthorized access, or commercial misuse (reselling, building competitors).</p>
            <HighlightBox type="legal">Violation of these prohibitions may result in immediate account termination and legal action.</HighlightBox>
        </SectionWrapper>

        <SectionWrapper id="payment" number="10" title="Payment and Subscriptions">
            <SubHeading title="10.1 Pre-Launch Pricing" />
            <p>Lumivex is currently in a pre-launch phase. No payments are required to join the waitlist. Future pricing plans will be displayed on our website, and waitlist members may receive special founder pricing.</p>
            <SubHeading title="10.2 Subscription Terms (Future)" />
            <p>When paid plans become available, subscriptions will be billed in advance. You authorize us to charge your payment method automatically. We may change pricing with 30 days' notice, but founder pricing for waitlist members will be locked in.</p>
            <SubHeading title="10.3 Refunds & Cancellation" />
            <p>We will offer a 30-day money-back guarantee for annual subscriptions. Monthly subscriptions are non-refundable after the first month. You may cancel at any time, and your access will continue until the end of the current billing period.</p>
        </SectionWrapper>
        
        <SectionWrapper id="beta" number="11" title="Beta Testing and Pre-Launch">
             <SimpleTermsBox summary={<p>Our pre-launch and beta versions are a work in progress. They might have bugs and are provided "as-is" without guarantees. Please don't share confidential details about them publicly.</p>} />
            <p>By joining the waitlist or participating in beta testing, you acknowledge that the Service is not yet publicly available, features may change, and launch dates are subject to change. If you receive beta access, you agree that the features may be confidential, contain bugs, and are provided "as-is" without warranties.</p>
        </SectionWrapper>
        
        <SectionWrapper id="availability" number="12" title="Service Availability">
            <p>We strive to provide a reliable service but do not guarantee uninterrupted or error-free access. We aim for 99.9% uptime for production services after launch. We may perform scheduled or emergency maintenance and reserve the right to modify or discontinue features at any time.</p>
        </SectionWrapper>
        
        <SectionWrapper id="disclaimers" number="13" title="Disclaimers and Warranties">
             <HighlightBox type="legal">
                <h4 className="font-bold text-amber-900 mb-2">"As-Is" Service</h4>
                <p>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
            </HighlightBox>
            <p>You acknowledge that AI-generated content may contain errors and you are responsible for validating AI outputs. We are not responsible for third-party services you connect to Lumivex.</p>
        </SectionWrapper>

        <SectionWrapper id="liability" number="14" title="Limitation of Liability">
            <HighlightBox type="legal">
                <h4 className="font-bold text-amber-900 mb-2">Our Liability is Limited</h4>
                <p>To the maximum extent permitted by law, Lumivex's total liability is limited to the greater of $100 USD or the amount you paid us in the last 12 months. We are not liable for indirect, incidental, or consequential damages like lost profits.</p>
            </HighlightBox>
        </SectionWrapper>
        
        <SectionWrapper id="indemnification" number="15" title="Indemnification">
             <SimpleTermsBox summary={<p>If your actions cause us legal trouble (for example, you violate these terms or upload content that infringes on someone's rights), you agree to cover our legal costs and damages.</p>} />
            <p>You agree to indemnify, defend, and hold harmless Lumivex and its affiliates from any claims, liabilities, damages, and costs arising from your violation of these Terms, your use of the Service, or your User Content.</p>
        </SectionWrapper>

        <SectionWrapper id="termination" number="16" title="Termination">
            <p>You may terminate your account at any time. We may suspend or terminate your account immediately if you violate these Terms, engage in illegal activity, or if your account is inactive for over 3 years. Upon termination, your access will cease, and we may delete your content after 30 days.</p>
        </SectionWrapper>

        <SectionWrapper id="dispute" number="17" title="Dispute Resolution">
            <HighlightBox type="legal">
                <h4 className="font-bold text-amber-900 mb-2">Binding Arbitration & Class Action Waiver</h4>
                <p>You agree to resolve disputes through binding individual arbitration, not in court. You waive your right to participate in class actions or jury trials. Before filing a claim, you must first attempt to resolve the issue with us informally.</p>
            </HighlightBox>
        </SectionWrapper>

        <SectionWrapper id="law" number="18" title="Governing Law">
            <p>These Terms are governed by the laws of India, without regard to conflict of law principles. Any disputes not subject to arbitration will be resolved in the courts of India.</p>
        </SectionWrapper>
        
        <SectionWrapper id="changes" number="19" title="Changes to Terms">
            <p>We reserve the right to modify these Terms. We will notify you of material changes via email or a notice on our website. Your continued use of the Service after changes become effective constitutes acceptance.</p>
        </SectionWrapper>
        
        <SectionWrapper id="contact" number="20" title="Contact Information">
            <p>For questions about these Terms, contact us:</p>
            <ul>
                <li><strong>General Inquiries:</strong> <a href="mailto:hello@lumivex.com">hello@lumivex.com</a></li>
                <li><strong>Legal Department:</strong> <a href="mailto:legal@lumivex.com">legal@lumivex.com</a></li>
            </ul>
        </SectionWrapper>
    </article>
  );
}
