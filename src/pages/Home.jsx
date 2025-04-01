import React from 'react';
import HeroSection from '../components/HomeComponents/HeroSection';
import FeatureAI from '../components/HomeComponents/FeatureAI';
import FeatureCards from '../components/HomeComponents/FeatureCards';
import Developer from '../components/HomeComponents/Developer';
import RulesHero from '../components/HomeComponents/RulesHero';
import StructureHero from '../components/HomeComponents/StructureHero';
import ProgressTrackHero from '../components/HomeComponents/ProgressTrackHero';
import ResponsiveHero from '../components/HomeComponents/ResponsiveHero';
import RankUpHero from '../components/HomeComponents/RankUpHero';
import FAQs from '../components/HomeComponents/FAQs';


const Home = () => {
    return (
        <>
            <HeroSection></HeroSection>
            <FeatureAI></FeatureAI>
            <FeatureCards></FeatureCards>
            <Developer></Developer>
            <RulesHero></RulesHero>
            <StructureHero></StructureHero>
            <ProgressTrackHero></ProgressTrackHero>
            <ResponsiveHero></ResponsiveHero>
            <RankUpHero></RankUpHero>
            <FAQs></FAQs>
        </>
    );
};

export default Home;