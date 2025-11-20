import { Hero } from '@/components/modules/Home/Hero';
import Specialties from '@/components/modules/Home/Specialities';
import Steps from '@/components/modules/Home/Steps';
import Testimonials from '@/components/modules/Home/Testimonials';
import TopRatedDoctors from '@/components/modules/Home/TopRatedDoctors';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>AI-Powered Healthcare - Find Your Perfect Doctor</title>
                <meta name="description" content="Welcome to PH-Doc. - Your trusted healthcare partner. Explore our services, find top-rated doctors, and take control of your health today." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Hero />
                <Specialties />
                <Steps />
                <Testimonials />
                <TopRatedDoctors />
            </main>
        </>
    );
}
