import { useState } from 'react';
import { completeLesson } from '../utils/courseActions';

export const useLessonCompletion = (enrollmentId, lessonId) => {
    const [loading, setLoading] = useState(false);

    const markCompleted = async ({ quizAnswers = {}, assignmentSubmission = "" } = {}) => {
        try {
            setLoading(true);
            await completeLesson({ enrollmentId, lessonId, quizAnswers, assignmentSubmission });
            return true;
        } catch (error) {
            console.error("Lesson completion failed:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { markCompleted, loading };
};
