/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { motion } from "framer-motion";
import Content from '../../Layouts/Content';
import TeamSection from '../../Layouts/TeamSection';
import Features from '../../Layouts/Features';
import Footer from '../../Layouts/Footer';
let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing }
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: easing
    }
  }
};

const fadeInRight = {
    initial: {
      x: 100,
      opacity: 0,
      transition: { duration: 0.6, ease: easing }
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.8,
        ease: easing
      }
    }
  };
  

  const fadeInLeft = {
    initial: {
      x: -100,
      opacity: 0,
      transition: { duration: 0.6, ease: easing }
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 2.0,
        ease: easing
      }
    }
  };

  const fadeInBottom = {
    initial: {
      y: -60,
      opacity: 0,
      transition: { duration: 0.6, ease: easing }
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 2.0,
        ease: easing
      }
    }
  };
  

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Hero() {
  return (
      <>
    <div className=" flex items-center justify-center overflow-hidden h-100 z-0 text-center back">
      <motion.div animate={fadeInUp.animate}
          initial={fadeInUp.initial} className="mx-auto lg:w-full">
        <div className="back-1  z-10 pb-8 pt-5 sm:pb-16 md:pb-20  lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <motion.div
              animate={fadeInRight.animate}
              initial={fadeInRight.initial}
              >
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl m-w-100">
                <span>We make students life easier</span>
              </h1>
              </motion.div>

              <motion.div
              animate={fadeInLeft.animate}
              initial={fadeInLeft.initial}
              >
              <p className="mt-3 text-base text-black-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
              </motion.div>
             
            </div>
          </main>
        </div>

      </motion.div>



    </div>
    <div id="about">
    <Content />
    <Features />

    </div>
    <div id="team">
    <TeamSection />

    </div>

    <div className="bg-white" id="location">
        <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Our Location</h2>
              <p className="text-xl text-gray-500">
                Faculty Of Science Of Tunisia
              </p>
            </div>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.373308782307!2d10.145384115337112!3d36.833534579941656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd33133403cc51%3A0xe751d5ed005a8f47!2sFacult%C3%A9%20des%20Sciences%20de%20Tunis%20(FST)!5e0!3m2!1sfr!2stn!4v1646548037414!5m2!1sfr!2stn" className="w-full" style={{border: 0, height:"300px"}} allowFullScreen loading="lazy" />    </div>
    </div></div>
    <Footer />

</>
  )
}
