import Image from "next/image";
export default function About() {
  return (
    <div className="flex flex-col mt-20 mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4 text-left">About Us</h1>
      <p className="mb-4 text-left">
        Welcome to OPIN, your go-to search engine for opinion-based answers. We
        are dedicated to providing you with reliable sources from various
        conversations across the web. Our mission is to help you make informed
        decisions based on user-generated content.
      </p>
      <h2 className="text-2xl font-semibold mb-2 text-left">Our Team</h2>
      <p className="mb-4 text-left">
        OPIN is driven by a team of passionate professionals in technology and
        user experience. We continuously innovate to enhance your search
        experience and ensure you find the answers you seek effectively.
      </p>
      <h2 className="text-2xl font-semibold mb-2 text-left">Our Vision</h2>
      <p className="mb-4 text-left">
        At OPIN, we envision a world where accessing trustworthy opinions is
        effortless. We strive to empower users with the information they need to
        make confident decisions in their daily lives.
      </p>
    </div>
  );
}
