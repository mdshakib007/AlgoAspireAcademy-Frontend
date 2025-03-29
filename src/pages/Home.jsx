import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureAI from '../components/FeatureAI';
import FeatureCards from '../components/FeatureCards';


const Home = () => {
    return (
        <>
            <HeroSection></HeroSection>
            <FeatureAI></FeatureAI>
            <FeatureCards></FeatureCards>
        </>
    );
};

export default Home;