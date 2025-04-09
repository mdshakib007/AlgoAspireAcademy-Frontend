import React from 'react';

const Rules = () => {
    return (
        <div className='max-w-3xl mx-auto px-4 py-8 text-gray-100'>
            <h1 className='text-3xl font-bold mb-6 gradient-text'>Platform Rules & Guidelines</h1>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-2'>📚 Course Enrollment</h2>
                <ul className='list-disc ml-6 space-y-1 text-gray-300'>
                    <li>Users must be logged in to enroll in any course.</li>
                    <li>Users must be complete running course to enroll in another course.</li>
                    <li>Some courses may have prerequisites, mentioned on the course detail page.</li>
                    <li>Enrolled courses will be available in the <strong>Continue Learning</strong> section.</li>
                </ul>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-2'>✅ Course Completion</h2>
                <ul className='list-disc ml-6 space-y-1 text-gray-300'>
                    <li>Complete all lessons to unlock the completion badges & achievements.</li>
                    <li>You must attempt all quizzes to count as “completed”.</li>
                    <li>Progress is saved automatically when you complete a lesson.</li>
                </ul>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-2'>📤 Sharing & Promotion</h2>
                <ul className='list-disc ml-6 space-y-1 text-gray-300'>
                    <li>You're encouraged to share free courses on social media to help others learn.</li>
                    <li>Use the share buttons on each course page to copy links.</li>
                    <li>Mention <code>#AlgoAspire</code> if sharing publicly to support the mission!</li>
                </ul>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-2'>🧑‍💻 Code of Conduct</h2>
                <ul className='list-disc ml-6 space-y-1 text-gray-300'>
                    <li>Be respectful in the forum and discussions.</li>
                    <li>No spam, advertisements, political issue, religious content, or inappropriate behavior.</li>
                    <li>Report misuse or bugs using the <strong>Contact</strong> page.</li>
                </ul>
            </section>

            <section className='mb-8'>
                <h2 className='text-2xl font-semibold mb-2'>📨 Support & Help</h2>
                <ul className='list-disc ml-6 space-y-1 text-gray-300'>
                    <li>Check FAQs before reaching out.</li>
                    <li>For personal help, use the contact form or join our Discord community.</li>
                    <li>Feedback is always welcome to improve the platform.</li>
                </ul>
            </section>

            <p className='text-sm text-gray-400 mt-10 text-center'>
                Last updated: April 9, 2025
            </p>
        </div>
    );
};

export default Rules;
