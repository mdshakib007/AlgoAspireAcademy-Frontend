import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-6 italic">Last updated: April 9, 2025</p>

      {/* 1. Introduction */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p className="mb-4">
          Welcome to AlgoAspire Academy. Our primary purpose is to provide free educational resources including coding courses, competitive programming courses, and a community forum dedicated to learning and mutual help. By accessing our platform, you agree to abide by these Terms of Service.
        </p>
      </section>

      {/* 2. Eligibility and Registration */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Eligibility and Registration</h2>
        <p className="mb-4">
          Our platform is open to all users, and we encourage participation from children as young as 10 years old, as we believe in empowering young learners in coding. During registration, users are required to choose an appropriate username. Accounts with usernames that include profanity or inappropriate language may be disabled.
        </p>
      </section>

      {/* 3. User Responsibilities and Conduct */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. User Responsibilities and Conduct</h2>
        <p className="mb-4">
          Users are expected to be respectful and polite towards others on the platform. We encourage users to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Write constructive and learning-focused content, avoiding any bad language or inappropriate remarks.</li>
          <li>Celebrate and appreciate the achievements of fellow users.</li>
          <li>Report any content, post, or comment that contains inappropriate material.</li>
        </ul>
        <p className="mb-4">
          Any violation of these conduct guidelines, including posting inappropriate, spam, political, or religious content, may result in content removal, account suspension, or a permanent ban.
        </p>
      </section>

      {/* 4. Intellectual Property */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Intellectual Property</h2>
        <p className="mb-4">
          All educational content provided on AlgoAspire Academy is for learning purposes only. Users are strictly prohibited from copying and pasting or distributing any course content or posts from our official forum/community. When you upload content to our platform, it becomes publicly accessible unless you set it to private.
        </p>
      </section>

      {/* 5. Service Modifications */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Service Modifications</h2>
        <p className="mb-4">
          We reserve the right to update or modify our services from time to time. Any changes to these Terms of Service will be communicated to you and will be effective upon your continued use of our platform. You are encouraged to review these terms periodically.
        </p>
      </section>

      {/* 6. Disclaimer and Limitations of Liability */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Disclaimer and Limitations of Liability</h2>
        <p className="mb-4">
          While we strive to ensure the accuracy, reliability, and availability of the content on our platform, there may be instances where these aspects are compromised. AlgoAspire Academy continuously monitors and corrects issues, but we do not guarantee uninterrupted service or error-free content. Use of our platform is at your own risk.
        </p>
      </section>

      {/* 7. Termination and Account Suspension */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Termination and Account Suspension</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate your account for violations of these Terms of Service, including but not limited to posting inappropriate content or using bad language. For minor violations, we may remove the content and issue a warning; repeated or severe violations may lead to permanent bans. In cases of termination, you will not have access to your data, and it will remain solely within our database.
        </p>
        <p className="mb-4">
          If a user believes that their account termination was unjust, they may request a review, and we will take appropriate action.
        </p>
      </section>

      {/* 8. Third-Party Links and Content */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Third-Party Links and Content</h2>
        <p className="mb-4">
          Our platform may include embedded links to third-party websites, such as YouTube for video lectures and links to coding problem sites like Codeforces. These links are provided solely for educational purposes. Users should exercise caution when accessing third-party content and are prohibited from using inappropriate links in forum posts.
        </p>
      </section>

      {/* 9. Governing Law and Dispute Resolution */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">9. Governing Law and Dispute Resolution</h2>
        <p className="mb-4">
          These Terms of Service shall be governed by and construed in accordance with the laws of Bangladesh. Any dispute or claim arising from or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Bangladesh.
        </p>
      </section>

      {/* 10. Changes to Terms */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">10. Changes to These Terms</h2>
        <p className="mb-4">
          We reserve the right to modify or update these Terms of Service at any time. Any changes will be posted on the platform along with the updated effective date. Your continued use of our platform after such changes constitutes your acceptance of the new terms.
        </p>
      </section>

      <p className="text-sm text-gray-300">
        Please review these Terms of Service periodically. If you have any questions about these terms, feel free to contact us at: 
        <a href="mailto:algoaspire.academy@gmail.com" className="text-yellow-600 underline ml-1">algoaspire.academy@gmail.com</a>
      </p>
    </div>
  );
};

export default Terms;
