import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <p className="mb-6 italic">Last updated: April 9, 2025</p>

            <p className="mb-4">
                At AlgoAspire Academy (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit and use our website, mobile applications, and services (collectively, the &ldquo;Platform&rdquo;). Please read this policy carefully. If you do not agree with the terms of this policy, please do not access the Platform.
            </p>

            <hr className="my-6 border-gray-300" />

            {/* 1. Information We Collect */}
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-semibold mb-2">1.1 Personal Information</h3>
            <p className="mb-4">
                When registering on our Platform, we require the following minimal information:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>
                    <strong>Mandatory:</strong> Email address, username, and password.
                </li>
                <li>
                    <strong>Optional:</strong> Name, profile picture, social media links (LinkedIn, Instagram, Codeforces, GitHub), phone number, T-shirt size, city, country, organization name, date of birth, job experience, and skill names.
                </li>
            </ul>
            <p className="mb-4">
                We do not collect any sensitive personal data.
            </p>

            <h3 className="text-xl font-semibold mb-2">1.2 Automated Data Collection</h3>
            <p className="mb-4">
                We also automatically collect certain information from your device, which may include your IP address and usage data, to help us improve our service performance and user experience.
            </p>

            <hr className="my-6 border-gray-300" />

            {/* 2. Account Registration and Authentication */}
            <h2 className="text-2xl font-semibold mb-4">2. Account Registration and Authentication</h2>
            <p className="mb-4">
                Users create accounts by registering with an email address, username, and password.
            </p>
            <p className="mb-4">
                <strong>Authentication:</strong> We utilize our own authentication system; therefore, third-party sign-in methods are not employed.
            </p>

            <hr className="my-6 border-gray-300" />

            {/* 3. Use of Information */}
            <h2 className="text-2xl font-semibold mb-4">3. Use of Information</h2>
            <h3 className="text-xl font-semibold mb-2">3.1 Provide and Improve our Service</h3>
            <p className="mb-4">
                We use the information collected from you to:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>Facilitate account creation and authentication.</li>
                <li>Personalize and improve your experience on the Platform.</li>
                <li>Allow you to share content, including comments, assignments, or other posts.</li>
                <li>Enable you to make your profile and posts public or private based on your preferences.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">3.2 Video Content</h3>
            <p className="mb-4">
                We embed YouTube videos on our Platform for educational video lectures. This embedding is solely to provide you with relevant learning content.
            </p>
            <h3 className="text-xl font-semibold mb-2">3.3 Cookies and Tokens</h3>
            <p className="mb-4">
                We use cookies on our Platform for storing minimal session data, such as a refresh token, to ensure a seamless user experience and maintain secure sessions.
            </p>

            <hr className="my-6 border-gray-300" />

            {/* 4. Data Storage and Hosting */}
            <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Hosting</h2>
            <p className="mb-4">
                <strong>Database:</strong> User data is stored on a free instance of Supabase PostgreSQL. While there may be future updates to platforms like AWS, for now, our service is maintained as a completely free platform.
            </p>
            <p className="mb-4">
                <strong>Web Hosting:</strong> Our backend and frontend services are hosted on Vercel.
            </p>
            <p className="mb-4">
                <strong>Image Storage:</strong> Profile pictures are currently hosted on imgbb due to limitations of our current Supabase free instance.
            </p>

            <hr className="my-6 border-gray-300" />

            {/* 5. Data Sharing and Disclosure */}
            <h2 className="text-2xl font-semibold mb-4">5. Data Sharing and Disclosure</h2>
            <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to outside parties except as provided in this Privacy Policy or with your explicit consent.
            </p>
            <p className="mb-4">
                <strong>Third-Party Services:</strong> The only third-party services used on our Platform are for video embedding (via YouTube) and image hosting (via imgbb).
            </p>

            <hr className="my-6 border-gray-300" />

            {/* 6. User Rights and Control */}
            <h2 className="text-2xl font-semibold mb-4">6. User Rights and Control</h2>
            <h3 className="text-xl font-semibold mb-2">6.1 Account Control</h3>
            <p className="mb-4">
                Users can configure their profiles to be private and control the visibility of their posts.
            </p>
            <h3 className="text-xl font-semibold mb-2">6.2 Data Access and Deletion</h3>
            <p className="mb-4">
                Users can request access to all personal information that has been collected or request a copy of their data.
            </p>
            <p className="mb-4">
                <strong>Account Deletion:</strong> Users can delete their accounts through our Platform. Deletions are &ldquo;soft delete&rdquo; by default, but permanent deletion (including all data) is available upon request.
            </p>

            <hr className="my-6 border-gray-300" />

            {/* 7. Children’s Privacy */}
            <h2 className="text-2xl font-semibold mb-4">7. Children&rsquo;s Privacy</h2>
            <p className="mb-4">
                Our Platform is open to all ages. However, users must possess a basic understanding of the English language. We encourage parents and guardians to help their children navigate the Platform responsibly. We do not knowingly collect information from children under the age recommended by local law.
            </p>

            <hr className="my-6 border-gray-300" />

            {/* 8. Data Security */}
            <h2 className="text-2xl font-semibold mb-4">8. Data Security</h2>
            <p className="mb-4">
                We take reasonable measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className="mb-4">
                <strong>Infrastructure:</strong> We employ standard security protocols for our database hosted on Supabase and our hosting on Vercel.
            </p>
            <p className="mb-4">
                <strong>Encryption and Access:</strong> User information is handled via encrypted connections, and access to data is limited to authorized personnel only.
            </p>

            <hr className="my-6 border-gray-300" />

            {/* 9. Changes to This Privacy Policy */}
            <h2 className="text-2xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
            <p className="mb-4">
                We reserve the right to update or modify this Privacy Policy at any time. If we decide to change our privacy practices, we will post the revised policy on this page and update the &ldquo;Last updated&rdquo; date. We encourage you to review this policy periodically.
            </p>

            <hr className="my-6 border-gray-300" />

            {/* 10. Contact Us */}
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="mb-4">
                For any questions or concerns regarding this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="mb-4">
                <strong>AlgoAspire Academy</strong><br />
                Email:{" "}
                <a
                    href="mailto:algoaspire.academy@gmail.com"
                    className="text-blue-600 underline"
                >
                    algoaspire.academy@gmail.com
                </a>
            </p>
            <p className="mb-4">
                By using our Platform, you acknowledge that you have read and understood this Privacy Policy and agree to our collection, processing, and disclosure practices as described herein.
            </p>
            <p className="text-sm text-gray-500">
                This privacy policy is provided for informational purposes and should be reviewed by legal counsel to ensure compliance with applicable laws and regulations.
            </p>
        </div>
    );
};

export default PrivacyPolicy;
