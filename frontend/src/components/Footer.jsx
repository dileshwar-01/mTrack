import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-6 text-center text-sm text-gray-600 mt-10">
      <div className="container mx-auto px-4">
        {/* Social Media Links Section */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://www.linkedin.com/in/dileshwar-singh-897156293/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with us on LinkedIn"
            className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/dileshwar-01/mTrack"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View MTrack on GitHub"
            className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
          >
          <FaGithub size={24} />
          </a>
        </div>

        {/* Copyright and Credits */}
      <p className="mb-1">
  © {new Date().getFullYear()} MTrack. Coded with passion, patience, and plenty of caffeine ☕.
</p>


      </div>
    </footer>
  );
};

export default Footer;