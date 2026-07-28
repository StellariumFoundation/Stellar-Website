<script lang="ts">
  import { Shield } from '@lucide/svelte';
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const appName = 'Stellarium Foundation';
  const companyName = 'Stellarium Foundation';
  const contactEmail = 'privacy@stellarium.app';
</script>

<div class="flex flex-col h-full overflow-y-auto no-scrollbar w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
  <div class="mb-6"><Shield size={48} class="text-white opacity-80 mx-auto lg:w-16 lg:h-16" /></div>
  <h1 class="text-2xl lg:text-4xl font-normal text-center uppercase tracking-wide mb-2">Privacy Policy</h1>
  <p class="text-center text-xs text-gray-400 mb-2">Last updated: {today}</p>
  <p class="text-center text-xs text-gray-500 mb-8">This policy applies to the {appName} mobile application and website.</p>

  <div class="space-y-8 text-sm lg:text-base text-gray-300 leading-relaxed">

    <section>
      <h2 class="text-white text-lg lg:text-xl font-normal mb-3">1. Introduction</h2>
      <p>{companyName} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, the "Service").</p>
      <p class="mt-3">By using the Service, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, do not use the Service.</p>
    </section>

    <section>
      <h2 class="text-white text-lg lg:text-xl font-normal mb-3">2. Information We Collect</h2>

      <h3 class="text-white text-base font-normal mb-2 mt-4">2.1 Information You Provide</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Contact Information:</strong> Email address and message content when you submit our contact form.</li>
        <li><strong>Communication Data:</strong> Any information you choose to include in messages submitted through the Service.</li>
      </ul>

      <h3 class="text-white text-base font-normal mb-2 mt-4">2.2 Information Collected Automatically</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Usage Data:</strong> We may collect anonymous usage statistics to improve the Service, including page views, feature interactions, and performance metrics.</li>
        <li><strong>Device Information:</strong> Device model, operating system version, and app version for compatibility and troubleshooting purposes.</li>
        <li><strong>Network Information:</strong> Connection type and quality metrics necessary for real-time voice communication functionality.</li>
      </ul>

      <h3 class="text-white text-base font-normal mb-2 mt-4">2.3 Information We Do Not Collect</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li>We do <strong>not</strong> collect your name, postal address, or phone number unless voluntarily provided.</li>
        <li>We do <strong>not</strong> collect location data.</li>
        <li>We do <strong>not</strong> collect browsing history or activity outside our Service.</li>
        <li>We do <strong>not</strong> use cookies, tracking pixels, or similar tracking technologies.</li>
        <li>We do <strong>not</strong> sell, rent, or trade your personal information to third parties.</li>
      </ul>
    </section>

    <section class="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6 lg:p-8">
      <h2 class="text-white text-lg lg:text-xl font-normal mb-3 flex items-center gap-2">
        <span class="text-red-400 text-xl">&#9888;</span> Zero-Logging Policy
      </h2>
      <p class="font-medium text-white">We operate a strict no-logging policy. We do not keep any logs of:</p>
      <ul class="list-disc pl-5 space-y-1 mt-3">
        <li>Voice communication data or audio recordings</li>
        <li>Connection timestamps or session durations</li>
        <li>IP addresses or network metadata</li>
        <li>Device identifiers or usage patterns</li>
        <li>User activity or browsing behavior on our Service</li>
      </ul>
      <p class="mt-3">Our relay server processes audio ephemerally in memory for the sole purpose of real-time transmission. No data is written to disk, logged, or retained after transmission completes. We have designed our infrastructure from the ground up with privacy as the default.</p>
    </section>

    <section>
      <h2 class="text-white text-lg lg:text-xl font-normal mb-3">5. Microphone Access and Voice Communications</h2>
      <p>The Service provides walkie-talkie-style voice communication ("Voice Calls"). This functionality requires access to your device's microphone.</p>

      <h3 class="text-white text-base font-normal mb-2 mt-4">5.1 How We Use Microphone Access</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li>Microphone access is used exclusively for real-time voice communication during active calls.</li>
        <li>Audio is captured only when you actively press and hold the "Push-to-Talk" (PTT) button.</li>
        <li>No audio is captured, recorded, or transmitted when you are not actively using the PTT feature.</li>
      </ul>

      <h3 class="text-white text-base font-normal mb-2 mt-4">5.2 Data Processing and Retention</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li>Voice audio is transmitted in real-time over encrypted channels (WSS/HTTPS).</li>
        <li>Audio data is <strong>not recorded, logged, or stored</strong> on our servers at any time.</li>
        <li>Audio is processed ephemerally in memory only for the duration necessary to relay the transmission to the intended recipient.</li>
        <li>Once a transmission is completed, the audio data is permanently discarded from server memory.</li>
      </ul>

      <h3 class="text-white text-base font-normal mb-2 mt-4">5.3 Permission Control</h3>
      <p>You may revoke microphone access at any time through your device settings. If you revoke access, voice calling functionality will be unavailable, but all other features of the Service will continue to operate normally.</p>
    </section>

    <section>
      <h2 class="text-white text-lg lg:text-xl font-normal mb-3">6. Legal Basis for Processing (GDPR)</h2>
      <p>If you are located in the European Economic Area (EEA) or the United Kingdom, our legal basis for collecting and using your personal information depends on the type of data and the context in which we collect it.</p>
      <ul class="list-disc pl-5 space-y-1 mt-3">
        <li><strong>Consent:</strong> We process your information when you have given us explicit consent to do so (e.g., when you grant microphone permission or submit a contact form).</li>
        <li><strong>Legitimate Interests:</strong> We process anonymous usage data based on our legitimate interest in improving and maintaining the Service.</li>
        <li><strong>Contractual Necessity:</strong> Processing necessary to provide you with the requested voice communication service.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-white text-lg lg:text-xl font-normal mb-3">7. Data Retention</h2>
      <p>We retain your information only as long as necessary to fulfill the purposes described in this Privacy Policy:</p>
      <ul class="list-disc pl-5 space-y-1 mt-3">
        <li><strong>Contact Form Submissions:</strong> Email and message content are forwarded to us via StaticForms and retained in our email records until you request deletion.</li>
        <li><strong>Voice Communication Data:</strong> Not retained. Audio is processed in real-time and immediately discarded.</li>
        <li><strong>Usage Analytics:</strong> Aggregated, anonymized data may be retained indefinitely for Service improvement purposes.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-white text-lg lg:text-xl font-normal mb-3">8. Data Sharing and Disclosure</h2>
      <p>We do not sell, trade, or share your personal information with third parties except in the following circumstances:</p>
      <ul class="list-disc pl-5 space-y-1 mt-3">
        <li><strong>Service Providers:</strong> We use StaticForms to process contact form submissions. StaticForms acts as a data processor and is contractually obligated to protect your data. View their privacy policy at <a href="https://staticforms.dev/privacy" target="_blank" rel="noopener noreferrer" class="text-[var(--color-tertiary)] underline">staticforms.dev/privacy</a>.</li>
        <li><strong>Legal Compliance:</strong> We may disclose information if required to do so by law or in response to valid legal requests by public authorities.</li>
        <li><strong>Protection of Rights:</strong> We may disclose information to enforce our terms, protect our rights, privacy, safety, or property, or that of others.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-white text-lg lg:text-xl font-normal mb-3">9. Data Security</h2>
      <p>We implement appropriate technical and organizational measures to protect your information:</p>
      <ul class="list-disc pl-5 space-y-1 mt-3">
        <li>All communications are encrypted in transit using TLS 1.3 (HTTPS) and WSS protocols.</li>
        <li>Voice data is transmitted over secure WebSocket connections with end-to-end encryption where supported.</li>
        <li>We regularly review our data collection, storage, and processing practices to prevent unauthorized access.</li>
        <li>Access to our systems is restricted to authorized personnel only.</li>
      </ul>
      <p class="mt-3">However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.</p>
    </section>

    <section>
      <h2 class="text-white text-lg lg:text-xl font-normal mb-3">10. Your Rights</h2>
      <p>Depending on your jurisdiction, you may have the following rights regarding your personal information:</p>

      <h3 class="text-white text-base font-normal mb-2 mt-4">10.1 For EEA/UK Users (GDPR)</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
        <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
        <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("Right to be Forgotten").</li>
        <li><strong>Right to Restrict Processing:</strong> Request restriction of processing your data.</li>
        <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service provider.</li>
        <li><strong>Right to Object:</strong> Object to our processing of your personal data.</li>
        <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where we rely on consent to process your data.</li>
      </ul>

      <h3 class="text-white text-base font-normal mb-2 mt-4">10.2 For California Users (CCPA)</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Right to Know:</strong> Request disclosure of the categories and specific pieces of personal information we have collected.</li>
        <li><strong>Right to Delete:</strong> Request deletion of personal information we have collected.</li>
        <li><strong>Right to Opt-Out:</strong> The Service does not sell personal information, so no opt-out is necessary.</li>
        <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA rights.</li>
      </ul>

      <h3 class="text-white text-base font-normal mb-2 mt-4">10.3 How to Exercise Your Rights</h3>
      <p>To exercise any of these rights, contact us at <span class="text-[var(--color-tertiary)]">{contactEmail}</span>. We will respond to your request within 30 days.</p>
    </section>

    <section>
      <h2 class="text-white text-lg lg:text-xl font-normal mb-3">11. Children's Privacy</h2>
      <p>Our Service is not directed to individuals under the age of 13 (or 16 in the EEA/UK). We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete such information promptly. If you believe a child has provided us with personal data, please contact us immediately.</p>
    </section>

    <section>
      <h2 class="text-white text-lg lg:text-xl font-normal mb-3">12. International Data Transfers</h2>
      <p>Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your jurisdiction. When we transfer your data internationally, we ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission where required.</p>
    </section>

    <section>
      <h2 class="text-white text-lg lg:text-xl font-normal mb-3">13. Third-Party Services</h2>
      <p>The Service integrates with the following third-party services:</p>
      <ul class="list-disc pl-5 space-y-1 mt-3">
        <li><strong>StaticForms:</strong> Processes contact form submissions. StaticForms does not store submitted data permanently. See their privacy policy at <a href="https://staticforms.dev/privacy" target="_blank" rel="noopener noreferrer" class="text-[var(--color-tertiary)] underline">staticforms.dev/privacy</a>.</li>
        <li><strong>Render (Cloud Hosting):</strong> Our WebSocket relay server is hosted on Render. Render's infrastructure complies with SOC 2 and GDPR standards.</li>
        <li><strong>GitHub Pages:</strong> Our static website is hosted via GitHub Pages. GitHub's privacy policy applies to the hosting infrastructure.</li>
      </ul>
      <p class="mt-3">We are not responsible for the privacy practices of these third-party services. We encourage you to review their privacy policies before using their services.</p>
    </section>

    <section>
      <h2 class="text-white text-lg lg:text-xl font-normal mb-3">14. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of any changes by:</p>
      <ul class="list-disc pl-5 space-y-1 mt-3">
        <li>Posting the new Privacy Policy on this page.</li>
        <li>Updating the "Last updated" date at the top of this page.</li>
        <li>Providing in-app notification for material changes where feasible.</li>
      </ul>
      <p class="mt-3">We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
    </section>

    <section>
      <h2 class="text-white text-lg lg:text-xl font-normal mb-3">15. Contact Information</h2>
      <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
      <ul class="list-disc pl-5 space-y-1 mt-3">
        <li><strong>Email:</strong> <span class="text-[var(--color-tertiary)]">{contactEmail}</span></li>
        <li><strong>Data Protection Officer:</strong> {contactEmail}</li>
        <li><strong>Response Time:</strong> We aim to respond to all inquiries within 30 days.</li>
      </ul>
    </section>
  </div>
</div>
