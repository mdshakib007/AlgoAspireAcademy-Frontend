import api from "../api/axiosInstance";

export const completeLesson = async ({ enrollmentId, lessonId, quizAnswers = {}, quizMarks = null, assignmentSubmission = "" }) => {
    const payload = {
        enrollment: enrollmentId,
        lesson: lessonId,
        quiz_answers: quizAnswers,
        quiz_marks: quizMarks,
        assignment_submission: assignmentSubmission,
    };
    const response = await api.post('/api/enrollment/complete-lesson/create/', payload);
    return response.data;
};
