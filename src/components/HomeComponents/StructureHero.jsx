import { FaExternalLinkAlt } from 'react-icons/fa';
import CommonButton from '../Common/CommonButton';
import { Link } from 'react-router-dom';


const StructureHero = () => {
    return (
        <section className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-24 px-2">
            <div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider">
                    The Best Course<br />
                    <span className="text-glow">Structure</span> to Learn!
                </h1>

                <p className="mt-4 text-lg">
                    Structure is<span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"> Best </span>Here<br />Just Like a Bird's<span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"> Nest!</span>
                </p>

                <div className='flex gap-10 my-10'>
                    <Link to='/courses'>
                        <CommonButton>Browse Courses</CommonButton>
                    </Link>
                    <a href='https://youtube.com/@AlgoAspire/' target='_blank'>
                        <CommonButton>YouTube <FaExternalLinkAlt /></CommonButton>
                    </a>
                </div>
            </div>
            <div>
                <img src="/structure.svg" alt="Hero" className="w-full max-w-sm md:max-w-md lg:max-w-xl h-auto" />
            </div>
        </section>
    );
};

export default StructureHero;
