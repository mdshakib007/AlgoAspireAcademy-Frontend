import CommonButton from '../Common/CommonButton';
import { Link } from 'react-router-dom';


const ProgressTrackHero = () => {
    return (
        <section className="container mx-auto flex flex-col-reverse md:flex-row justify-between items-center mt-24 px-2">
            <div>
                <img src="/progress_tracking.svg" alt="Hero" className="w-full max-w-sm md:max-w-md lg:max-w-xl h-auto" />
            </div>
            <div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider">
                    Track Your
                    <span className="text-glow"> Progress </span><br /> & All Activity!
                </h1>

                <p className="mt-4 text-lg">
                    Every <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"> Single </span>Activity is Tracking,<br /> See Your
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"> Progress </span>
                    Everyday!
                </p>

                <div className='my-10 w-fit'>
                    <Link to='/courses'>
                        <CommonButton>Enroll Now!</CommonButton>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProgressTrackHero;
