import { Hero } from '@/components/modules/Home/Hero';
import Specialties from '@/components/modules/Home/Specialities';
import Steps from '@/components/modules/Home/Steps';
import Testimonials from '@/components/modules/Home/Testimonials';
import TopRatedDoctors from '@/components/modules/Home/TopRatedDoctors';

export default function Home() {
    return (
        <div>
            <Hero />
            <Specialties />
            <Steps />
            <Testimonials />
            <TopRatedDoctors />
        </div>
    );
}
