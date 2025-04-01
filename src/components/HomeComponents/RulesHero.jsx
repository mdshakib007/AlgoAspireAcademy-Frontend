import CommonButton from '../Common/CommonButton';
import { Link } from 'react-router-dom';


const RulesHero = () => {
    return (
        <section className="container mx-auto flex flex-col-reverse md:flex-row justify-between items-center mt-24 px-2">
            <div>
                <img src="/thinking.svg" alt="Hero" className="w-full max-w-sm md:max-w-md lg:max-w-xl h-auto" />
            </div>
            <div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider">
                    Think<span className="text-glow"> Deeply </span><br />Before Enroll!
                </h1>

                <p className="mt-4 text-lg">
                    Complete<span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"> First </span>Course,<br />To Start Learning
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"> Another </span>One!
                </p>

                <div className='flex gap-10 my-10'>
                    <Link to='/rules'>
                        <CommonButton>See Rules</CommonButton>
                    </Link>
                    <Link to='/courses'>
                        <CommonButton>Choose Course</CommonButton>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RulesHero;
