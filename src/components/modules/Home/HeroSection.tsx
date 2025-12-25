import { ArrowRight, Award, Search, Shield, Sparkles } from 'lucide-react';
import svgPaths from '../../../assets/svg/svgs';

interface HeroSectionProps {
    badge?: {
        text: string;
        icon?: React.ReactNode;
    };
    heading?: {
        line1: string;
        line2: string;
        highlight: string;
    };
    description?: string;
    buttons?: {
        primary: { text: string; onClick?: () => void };
        secondary: { text: string; onClick?: () => void };
    };
    stats?: Array<{ value: string; label: string }>;
    demo?: {
        searchPlaceholder: string;
        statusCards: Array<{ title: string; description: string; variant: 'info' | 'success' }>;
        features: Array<{ icon: React.ReactNode; label: string }>;
    };
}

export function HeroSection({
    badge = {
        text: 'AI-Powered Doctor Matching'
    },
    heading = {
        line1: 'Find Your Perfect',
        line2: 'Doctor with',
        highlight: 'AI Intelligence'
    },
    description = 'Our revolutionary AI-driven system analyzes your symptoms, medical history, and preferences to match you with the ideal healthcare specialist in seconds. No more guesswork, just the right care.',
    buttons = {
        primary: { text: 'Try AI Doctor Match' },
        secondary: { text: 'Learn More' }
    },
    stats = [
        { value: '10K+', label: 'Doctors' },
        { value: '50K+', label: 'Patients' },
        { value: '98%', label: 'Match Rate' }
    ],
    demo = {
        searchPlaceholder: 'Describe your symptoms...',
        statusCards: [
            {
                title: 'Analyzing symptoms...',
                description: 'AI is processing your information',
                variant: 'info' as const
            },
            {
                title: '✓ Match found!',
                description: '3 specialists available',
                variant: 'success' as const
            }
        ],
        features: [
            { icon: <Sparkles className="size-6" />, label: 'AI Analysis' },
            { icon: <Shield className="size-6" />, label: 'Secure' },
            { icon: <Award className="size-6" />, label: 'Trusted' }
        ]
    }
}: HeroSectionProps) {
    return (
        <section className="relative w-full py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="flex flex-col space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full w-fit">
                            <div className="size-4">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                    <g clipPath="url(#clip0_1_129)">
                                        <path d={svgPaths.p793d980} stroke="#1D4ED8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <path d={svgPaths.p3c9b070} stroke="#1D4ED8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <path d={svgPaths.p201773c0} stroke="#1D4ED8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <path d={svgPaths.p16a10180} stroke="#1D4ED8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <path d={svgPaths.p2fa97700} stroke="#1D4ED8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <path d={svgPaths.pa74d6c0} stroke="#1D4ED8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <path d={svgPaths.p2e628f00} stroke="#1D4ED8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <path d={svgPaths.p15dee700} stroke="#1D4ED8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <path d={svgPaths.p9092c00} stroke="#1D4ED8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1_129">
                                            <rect fill="white" height="16" width="16" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <span className="text-xs font-medium">{badge.text}</span>
                        </div>

                        {/* Heading */}
                        <div className="space-y-2">
                            <h1 className="text-4xl sm:text-5xl lg:text-[51px] leading-tight">
                                <span className="text-gray-900">{heading.line1}</span>
                                <br />
                                <span className="text-gray-900">{heading.line2} </span>
                                <span className="text-blue-600">{heading.highlight}</span>
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">{description}</p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={buttons.primary.onClick}
                                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors">
                                <span className="font-semibold">{buttons.primary.text}</span>
                                <ArrowRight className="size-5" />
                            </button>
                            <button
                                onClick={buttons.secondary.onClick}
                                className="inline-flex items-center justify-center bg-transparent text-gray-700 px-8 py-4 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors">
                                <span className="font-semibold">{buttons.secondary.text}</span>
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 pt-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="space-y-1">
                                    <div className="text-2xl sm:text-3xl text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Demo Visual */}
                    <div className="relative">
                        <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 overflow-hidden">
                            {/* Search Card */}
                            <div className="bg-white rounded-xl p-6 mb-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <Search className="size-5 text-gray-400" />
                                    <input type="text" placeholder={demo.searchPlaceholder} className="flex-1 outline-none text-gray-400 placeholder:text-gray-300" disabled />
                                </div>

                                {/* Status Cards */}
                                <div className="space-y-4">
                                    {demo.statusCards.map((card, index) => (
                                        <div key={index} className={`p-4 rounded-lg ${card.variant === 'info' ? 'bg-blue-50' : 'bg-green-50'}`}>
                                            <div className="text-sm font-medium text-gray-900 mb-1">{card.title}</div>
                                            <div className="text-xs text-gray-600">{card.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Feature Badges */}
                            <div className="grid grid-cols-3 gap-4">
                                {demo.features.map((feature, index) => (
                                    <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center gap-2">
                                        <div className="text-white">{feature.icon}</div>
                                        <div className="text-xs text-white text-center">{feature.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
