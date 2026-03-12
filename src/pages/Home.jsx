import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
    return (
        <div className="bg-background dark:bg-dark-bg min-h-screen">
            <HeroSection />
            <FeaturedProducts />
            <Newsletter />
        </div>
    );
};

export default Home;
