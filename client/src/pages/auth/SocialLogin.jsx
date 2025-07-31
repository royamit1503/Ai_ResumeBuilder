import React from "react";
import { motion } from "framer-motion";

const SocialLogin = () => {
  return (
    <div className="mt-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <motion.div
            className="w-full border-t border-gray-300"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          ></motion.div>
        </div>
        <div className="relative flex justify-center text-sm">
          <motion.span
            className="px-2 bg-white text-gray-500"
            animate={{
              y: [0, -2, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Or continue with
          </motion.span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6">
        <motion.a
          href="#"
          whileHover={{
            scale: 1.2,
            y: -10,
            boxShadow: "0 20px 35px -8px rgba(0, 0, 0, 0.3)",
            rotate: [0, 3, 0, -3, 0],
            transition: { duration: 0.5 },
          }}
          whileTap={{
            scale: 0.85,
            boxShadow: "0 8px 15px -5px rgba(0, 0, 0, 0.2)",
          }}
          className="w-full inline-flex justify-center py-2 px-3 border border-gray-200/50 rounded-xl shadow-lg bg-white/70 backdrop-blur-sm text-xs font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 shimmer-effect"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
          aria-label="Sign in with Google"
        >
          <motion.div
            animate={{
              rotateY: [0, 15, 0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-6 h-6 text-black"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
            </svg>
          </motion.div>
        </motion.a>

        <motion.a
          href="#"
          whileHover={{
            scale: 1.2,
            y: -10,
            boxShadow: "0 20px 35px -8px rgba(0, 0, 0, 0.3)",
            rotate: [0, 3, 0, -3, 0],
            transition: { duration: 0.5 },
          }}
          whileTap={{
            scale: 0.85,
            boxShadow: "0 8px 15px -5px rgba(0, 0, 0, 0.2)",
          }}
          className="w-full inline-flex justify-center py-2 px-3 border border-gray-200/50 rounded-xl shadow-lg bg-white/70 backdrop-blur-sm text-xs font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 shimmer-effect"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
          aria-label="Sign in with Facebook"
        >
          <motion.div
            animate={{
              rotateY: [0, -15, 0, 15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <svg
              className="w-6 h-6 text-blue-600"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        </motion.a>

        <motion.a
          href="#"
          whileHover={{
            scale: 1.2,
            y: -10,
            boxShadow: "0 20px 35px -8px rgba(0, 0, 0, 0.3)",
            rotate: [0, 3, 0, -3, 0],
            transition: { duration: 0.5 },
          }}
          whileTap={{
            scale: 0.85,
            boxShadow: "0 8px 15px -5px rgba(0, 0, 0, 0.2)",
          }}
          className="w-full inline-flex justify-center py-2 px-3 border border-gray-200/50 rounded-xl shadow-lg bg-white/70 backdrop-blur-sm text-xs font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 shimmer-effect"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
          aria-label="Sign in with GitHub"
        >
          <motion.div
            animate={{
              rotateY: [0, 15, 0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <svg
              className="w-6 h-6 text-gray-900"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        </motion.a>
      </div>
    </div>
  );
};

export default SocialLogin;