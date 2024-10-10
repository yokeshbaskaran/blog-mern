import { LuDot } from "react-icons/lu";

const Footer = () => {
  return (
    <footer>
      <div className="py-3 text-center fs-6 text-white bg-secondary">
        <span>
          &copy;2024 My Personal Blog
          <LuDot size={20} />
          All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
