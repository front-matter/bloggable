import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-gray-300 pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto">
              <div
                className="text-sm text-gray-600 font-semibold py-1"
                data-cy="copyright"
              >
                Copyright © {new Date().getFullYear()} Martin Fenner.
                <p>
                  Distributed under the terms of the{" "}
                  <a href="https://creativecommons.org/licenses/by/4.0/legalcode">
                    Creative Commons Attribution License.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
