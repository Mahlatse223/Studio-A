import ComplainForm from '@/components/support/page';
import React from 'react';

const Home = () => {
  return (
    <>
      <section className="mt-[110px] w-full mx-auto flex items-center justify-between gap-8 h-full  p-6 rounded-lg">
        {/* Right Side - Image */}
        <div className="w-[60%] h-full flex items-center justify-center">
          <img 
            src="/apartments.jpg" 
            alt="apartments" 
            className="w-[80%] h-100 object-fill rounded-md"
          />
        </div>

        {/* Left Side - Info */}
        <div className="w-[40%] h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-roboto font-bold text-[40px] leading-[47px] text-[#398DFA] mb-6">
            Report Issues Promptly for a Better Living Environment
          </h1>
          <p className="font-roboto font-normal text-[24px] leading-[28px] text-black">
            Living in a studio apartment comes with shared spaces and responsibilities. If you experience maintenance
            problems such as plumbing leaks, electrical faults, or broken appliances, or if you&apos;re disturbed by noise
            complaints, suspicious activities, or other concerns, it’s essential to report them immediately. Prompt reporting
            helps ensure your safety, comfort, and the overall harmony of the community. Your voice matters—don’t hesitate to
            make it heard!
          </p>
        </div>
      </section>

      {/* New Section */}
        <section>
          <ComplainForm/>
        </section>


    </>
  );
};

export default Home;