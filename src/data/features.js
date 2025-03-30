import {
    FaCode, FaPencilAlt, FaRegGem, FaFire, FaRegBookmark, FaRegStickyNote
} from "react-icons/fa";
import {
    MdOutlineEmojiEvents, MdOutlineSupportAgent, MdOutlineLeaderboard,
    MdAssignmentAdd, MdEventAvailable, MdOutlineForum, MdOutlineDashboardCustomize,
    MdOutlineDashboard, MdOutlineQuiz, MdPublic
} from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { LuListTodo } from "react-icons/lu";
import { TbStairsUp } from "react-icons/tb";
import { BsRobot } from "react-icons/bs";
import { RiPagesLine } from "react-icons/ri";
import { GiProgression } from "react-icons/gi";
import { FcHeatMap } from "react-icons/fc";
import { VscVscode, VscFileSubmodule } from "react-icons/vsc";
import { PiRankingDuotone } from "react-icons/pi";
import { SlBadge } from "react-icons/sl";


const features = [
    {
        id: 1,
        icon: TbStairsUp,
        title: 'Step-by-Step Learning Path',
        description: 'Progress seamlessly from beginner to advanced levels with structured lessons, video tutorials, editorials, and coding exercises.'
    },
    {
        id: 2,
        icon: IoVideocamOutline,
        title: 'Video Lessons for Every Topic',
        description: 'Master concepts effortlessly with high-quality video lessons tailored for every topic, making learning easier and more engaging.'
    },
    {
        id: 3,
        icon: LuListTodo,
        title: 'Extensive Problem Sets',
        description: 'Reinforce your learning by solving a vast collection of competitive programming problems designed to test and apply your knowledge effectively.'
    },
    {
        id: 4,
        icon: FaCode,
        title: 'Line-by-Line Code Explanations',
        description: 'Understand every single line of code with in-depth explanations, walkthroughs, and practical examples.'
    },
    {
        id: 5,
        icon: BsRobot,
        title: 'AI-Powered Assistant for Instant Help',
        description: 'Stuck somewhere? Get instant support from an AI assistant, available anytime to clarify doubts and provide solutions.'
    },
    {
        id: 6,
        icon: FaPencilAlt,
        title: 'Editorials for All Topics',
        description: 'Access comprehensive written explanations, line-by-line breakdowns, and insights into different problem-solving approaches.'
    },
    {
        id: 7,
        icon: MdOutlineQuiz,
        title: 'Quizzes to Test Your Progress',
        description: 'Gauge your understanding with topic-based quizzes designed to reinforce concepts and identify weak areas.'
    },
    {
        id: 8,
        icon: MdAssignmentAdd,
        title: 'Assignments for Practical Learning',
        description: 'Apply what you\'ve learned by completing structured assignments at the end of each module to deepen your understanding.'
    },
    {
        id: 9,
        icon: FcHeatMap,
        title: 'Activity Heatmap for Progress Tracking',
        description: 'Visualize your daily learning activity with an interactive heatmap that keeps you motivated to stay consistent.'
    },
    {
        id: 10,
        icon: MdOutlineLeaderboard,
        title: 'Dynamic Leaderboard & Rankings',
        description: 'Compete with others, climb the leaderboard, and earn recognition for your progress in coding challenges and courses.'
    },
    {
        id: 11,
        icon: GiProgression,
        title: 'Track Your Learning Progress',
        description: 'Monitor your learning journey with detailed progress tracking, helping you stay motivated and focused.'
    },
    {
        id: 12,
        icon: FaRegGem,
        title: 'Earn Neon & Unlock Perks',
        description: 'Complete lessons, quizzes, and challenges to collect Neon-Gems, unlocking exclusive benefits and surprises!'
    },
    {
        id: 13,
        icon: FaRegBookmark,
        title: 'Bookmark Important Lessons',
        description: 'Save key lessons for quick access and revisit them anytime without searching through the entire course.'
    },
    {
        id: 14,
        icon: FaRegStickyNote,
        title: 'Personal Notes for Each Lesson',
        description: 'Take and store notes within lessons for quick reference, helping you retain key insights and concepts.'
    },
    {
        id: 15,
        icon: MdPublic,
        title: 'Public & Private Notes for Collaboration',
        description: 'Share your notes with others or keep them private; public notes can be rated and commented on by fellow learners.'
    },
    {
        id: 16,
        icon: FaFire,
        title: 'Daily Streaks & Rewards',
        description: 'Maintain your daily streak to earn rewards, boost motivation, and develop a consistent learning habit.'
    },
    {
        id: 17,
        icon: MdOutlineForum,
        title: 'Forum for Help & Discussion',
        description: 'Ask questions, discuss problems, share feedback, and connect with fellow learners in an active community forum.'
    },
    {
        id: 18,
        icon: PiRankingDuotone,
        title: 'Upgrade Your League & Rank',
        description: 'Stay active, practice more, earn Neon, and level up in the ranking system to showcase your expertise.'
    },
    {
        id: 19,
        icon: MdOutlineEmojiEvents,
        title: 'Complete Tasks to Earn Achievements',
        description: 'Unlock special achievements and badges by completing tasks, showcasing your dedication and progress.'
    },
    {
        id: 20,
        icon: SlBadge,
        title: 'Collect & Showcase Badges',
        description: 'Earn badges for your accomplishments and proudly display them on your profile as proof of your skills.'
    },
    {
        id: 21,
        icon: VscVscode,
        title: 'Integrated Coding Space',
        description: 'Practice coding directly on the platform without switching to another tool everything you need in one place!'
    },
    {
        id: 22,
        icon: MdOutlineDashboard,
        title: 'Dynamic Visual Dashboard',
        description: 'See everything you are doing, do not miss any single things! See your activity on visual dashboard.'
    },
    {
        id: 23,
        icon: MdOutlineDashboardCustomize,
        title: 'Customize Your Profile',
        description: 'Customize your profile by your interest! customize your way! Join bro, to know more!'
    },
    {
        id: 24,
        icon: VscFileSubmodule,
        title: 'Well-Structured Course Hierarchy',
        description: 'Navigate easily with a structured format: Course → Module → Lesson → (Video, Text, Quiz, Assignment).'
    },
    {
        id: 25,
        icon: MdEventAvailable,
        title: 'Local Seasonal Events & Rewards',
        description: 'Participate in special seasonal events to win rewards, bonuses, and exclusive perks.'
    },
    {
        id: 26,
        icon: MdOutlineSupportAgent,
        title: 'Support Never Ends!',
        description: 'When you need any support, you can post in forum or you can ask AI or even you can reach me to solve any problem you are facing when continuing course.'
    },
    {
        id: 27,
        icon: RiPagesLine,
        title: 'Editorials for All Topics',
        description: 'Don\'t worries! You can get a vast amount of text editorials to explore and learn. line by line code explanation, how and why question\'s answer!'
    },

]

export default features;