import React from 'react';

const NotFound = () => {
    return (
        <section className='container mx-auto'>
            <div className='flex flex-col justify-center items-center'>
            <img src="/page_not_found.svg" alt="404" className=''/>
            <h1 className='text-4xl md:text-5xl lg:text-7xl font-bold font-mono my-5 gradient-text'>Page Not Found!</h1>
        </div>
        </section>
    );
};

export default NotFound;