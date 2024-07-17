import Image from "next/image";
export default function About() {
  return (
    <div className="flex flex-col mt-20 mx-auto  px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4 text-left">About Us</h1>
      <p className="mb-4 text-left">
        Welcome to our app! We are dedicated to providing you with the best
        service possible. Our mission is to help you find reliable information
        and make informed decisions based on user-generated content.
      </p>
      <h2 className="text-2xl font-semibold mb-2 text-left">Our Team</h2>
      <p className="mb-4 text-left">
        Our team is composed of experienced professionals passionate about
        technology and user experience. We strive to innovate and improve our
        platform continuously.
      </p>
      <h2 className="text-2xl font-semibold mb-2 text-left">Our Vision</h2>
      <p className="mb-4 text-left">
        We envision a world where users can access trustworthy information
        easily, allowing them to make better choices in their daily lives.
      </p>
    </div>
  );
}
