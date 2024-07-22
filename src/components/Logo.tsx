import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link className="hover:text-gray-400" href="/">
        Logo
      </Link>
    </div>
  );
};

export default Logo;
