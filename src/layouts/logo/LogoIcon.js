import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoDark from "../../../public/logo.png";

const LogoIcon = () => {
  return (
    <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <Link href="/">
        <Image src={LogoDark} alt={LogoDark} height={60} width={60} />
      </Link>
      <p>NextWear</p>
    </div>
  );
};

export default LogoIcon;
