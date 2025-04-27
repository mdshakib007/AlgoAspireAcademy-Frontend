import api from "../api/axiosInstance";

export const completeLesson = async ({ enrollmentId, lessonId, quizAnswers = {}, assignmentSubmission = "" }) => {
    const payload = {
        enrollment: enrollmentId,
        lesson: lessonId,
        quiz_answers: quizAnswers,
        assignment_submission: assignmentSubmission,
    };
    const response = await api.post('/api/enrollment/complete-lesson/create/', payload);
    return response.data;
};
