import React from 'react';
import logo from "./assets/whitelogo.svg"
import facebook from "./assets/facebooklogo.png";
import instagram from "./assets/instagram.png";
import twitter from "./assets/xlogo.png";
import youtube from "./assets/youtubelogo.png";
import linkedin from "./assets/linkedin.png";

const Footer: React.FC = () => {
  return (
    <>
      <svg className="bg-gray-100 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z"
          className="fill-current text-gray-800"></path>
      </svg>
      <div className=" bg-gray-800 pt-9 ">
        <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
          <div className="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
            <div className="md:w-[316px]">
              <h6 className="text-white font-extrabold">
                <img src={logo} className='h-48' />
              </h6>
              <br />
              <span className=" font-semibold italic text-yellow-300 mt-2 ">
                "We promise same-day delivery, real-time tracking, and unbeatable customer support."
              </span>
              <span className="block mt-2 text-yellow-100">
                Join thousands of happy customers who trust us to get their errands done, hassle-free.
              </span>
             <div className="mt-[18px] flex gap-4">
                <a className="hover:scale-110" target="_blank" rel="noopener noreferrer" href="#">
                  <img
                    alt="facebook icon"
                    loading="lazy"
                    width="36"
                    height="36"
                    src={facebook}
                  />
                </a>
                <a className="hover:scale-110" target="_blank" rel="noopener noreferrer" href="/">
                  <img
                    alt="linkedin icon"
                    loading="lazy"
                    width="36"
                    height="36"
                    src={linkedin}
                  />
                </a>
                <a className="hover:scale-110" target="_blank" rel="noopener noreferrer" href="/">
                  <img
                    alt="instagram icon"
                    loading="lazy"
                    width="36"
                    height="36"
                    src={instagram}
                  />
                </a>
                <a className="hover:scale-110" target="_blank" rel="noopener noreferrer" href="/">
                  <img
                    alt="twitter icon"
                    loading="lazy"
                    width="36"
                    height="36"
                    src={twitter}
                  />
                </a>
                <a className="hover:scale-110" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/">
                  <img
                    alt="youtube icon"
                    loading="lazy"
                    width="36"
                    height="36"
                    src={youtube}
                  />
                </a>
              </div>
            </div>

            <div className="md:w-[316px]">
              <div className="mt-[23px] flex">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                  {/* Phone Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20.8472 14.8554L16.4306 12.8764L16.4184 12.8707C16.1892 12.7727 15.939 12.7333 15.6907 12.7562C15.4424 12.7792 15.2037 12.8636 14.9963 13.002C14.9718 13.0181 14.9484 13.0357 14.9259 13.0545L12.6441 14.9998C11.1984 14.2976 9.70595 12.8164 9.00376 11.3895L10.9519 9.07294C10.9706 9.0495 10.9884 9.02606 11.0053 9.00075C11.1407 8.79384 11.2229 8.55667 11.2445 8.31035C11.2661 8.06402 11.2264 7.81618 11.1291 7.58887V7.57762L9.14438 3.15356C9.0157 2.85662 8.79444 2.60926 8.51362 2.44841C8.2328 2.28756 7.9075 2.22184 7.58626 2.26106C6.31592 2.42822 5.14986 3.05209 4.30588 4.01615C3.4619 4.98021 2.99771 6.21852 3.00001 7.49981C3.00001 14.9436 9.05626 20.9998 16.5 20.9998C17.7813 21.0021 19.0196 20.5379 19.9837 19.6939C20.9477 18.85 21.5716 17.6839 21.7388 16.4136C21.7781 16.0924 21.7125 15.7672 21.5518 15.4864C21.3911 15.2056 21.144 14.9843 20.8472 14.8554ZM16.5 19.4998C13.3185 19.4963 10.2682 18.2309 8.01856 15.9813C5.76888 13.7316 4.50348 10.6813 4.50001 7.49981C4.49648 6.58433 4.82631 5.69887 5.42789 5.00879C6.02947 4.3187 6.86167 3.87118 7.76907 3.74981C7.7687 3.75355 7.7687 3.75732 7.76907 3.76106L9.73782 8.16731L7.80001 10.4867C7.78034 10.5093 7.76247 10.5335 7.74657 10.5589C7.60549 10.7754 7.52273 11.0246 7.5063 11.2825C7.48988 11.5404 7.54035 11.7981 7.65282 12.0307C8.5022 13.7679 10.2525 15.5051 12.0084 16.3536C12.2428 16.465 12.502 16.5137 12.7608 16.495C13.0196 16.4762 13.2692 16.3907 13.485 16.2467C13.5091 16.2305 13.5322 16.2129 13.5544 16.1942L15.8334 14.2498L20.2397 16.2232C20.2397 16.2232 20.2472 16.2232 20.25 16.2232C20.1301 17.1319 19.6833 17.9658 18.9931 18.5689C18.3028 19.172 17.4166 19.5029 16.5 19.4998Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="ml-[18px]">
                  <a href="tel:+254114353111" className="font-Inter text-[14px] font-medium text-white">
                    +254 114 353111
                  </a>
                  <p className="font-Inter text-[12px] font-medium text-white">Support Number</p>
                </div>
              </div>

              <div className="mt-[23px] flex">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                  {/* Email Icon */}
                  <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 0H1C0.801088 0 0.610322 0.0790178 0.46967 0.21967C0.329018 0.360322 0.25 0.551088 0.25 0.75V13.5C0.25 13.6989 0.329018 13.8897 0.46967 14.0303C0.610322 14.171 0.801088 14.25 1 14.25H19C19.1978 14.25 19.3885 14.171 19.5303 14.0303C19.671 13.8897 19.75 13.6989 19.75 13.5V0.75C19.75 0.551088 19.671 0.360322 19.5303 0.21967C19.3885 0.0790178 19.1978 0 19 0ZM18.2397 1.5L10.2854 7.36425C10.202 7.42469 10.1024 7.45796 10 7.45796C9.8976 7.45796 9.798 7.42469 9.71465 7.36425L1.76034 1.5H18.2397ZM18.5 13.25H1.5V1.98925L9.44975 7.86575C9.70224 8.04797 10.0525 8.04797 10.305 7.86575L18.25 1.98925V13.25Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="ml-[18px]">
                  <a href="mailto:support@speedstardelivery.com" className="font-Inter text-[14px] font-medium text-white">
                    support@speedstardelivery.com
                  </a>
                  <p className="font-Inter text-[12px] font-medium text-white">Support Email</p>
                </div>
              </div>
            </div>

            <div className="md:w-[316px]">
              <form className="mt-[23px]">
                <input
                  className="block w-full border border-[#E9E9E9] bg-transparent py-3 px-6 text-white placeholder:text-white outline-none"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                />
                <button
                  type="submit"
                  className="mt-4 block w-full bg-rose-600 py-[15px] text-center font-bold text-white hover:bg-rose-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <p className="pb-9 pt-[75px] text-center font-Inter text-[14px] font-normal text-white">
            Copyright © 2024 - All rights reserved.
            <a
              href="https://www.blackienetworks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:underline"
            >
              Designed by Blackienetworks
            </a>
          </p>

        </div>
      </div>
    </>
  );
};

export default Footer;
