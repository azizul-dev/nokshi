import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
    return (
        <div className="relative w-full h-[550px] md:h-[650px] rounded-2xl overflow-hidden">

            <Image
                src="/hero1.png"
                alt="Nokshi collection banner"
                fill
                className="object-cover"
                priority
            />

            <div className="absolute inset-0 bg-black/10"></div>

            <p className="absolute top-8 left-8 max-w-xs text-sm text-white leading-relaxed font-medium">
                We are dedicated to creating high-quality, handcrafted apparel that fits your lifestyle.
            </p>

            <h1 className="absolute bottom-24 right-8 text-right text-5xl md:text-7xl text-white leading-[0.95]">
                Wear Your <br />
                <span className="italic font-heading">Confidence</span>
            </h1>

            <Link
                href="/products"
                className="absolute bottom-8 left-8 bg-white text-[#2B2420] text-sm font-medium px-5 py-3 rounded-full flex items-center gap-2 hover:gap-3 transition-all"
            >
                Shop now <FaArrowRight />
            </Link>

        </div>
    );
};

export default Hero;