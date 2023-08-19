import Image from 'next/image';
import banner from '../../public/home.jpg';

export default function Home() {
  return (
    <div className="pt-6 md:pt-12 flex flex-col items-center banner-bg">
      <div className="text-center">
        <h1 className="text-2xl md:text-5xl font-semibold">Social proof at scale</h1>
        <p className="md:text-xl mt-4 text-sm w-4/6 mx-auto">
          Our software captures and transforms customer feedback into good studies, testimonials, reviews, and more.
        </p>
      </div>
      <div className="mt-36 flex justify-center items-center">
        <div className=" max-w-[600px]">
          <Image src={banner} alt="Banner" height={600} width={700} />
        </div>
      </div>
    </div>
  );
}
