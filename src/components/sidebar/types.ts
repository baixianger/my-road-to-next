import { SVGProps } from "react";

export type NavItem = {
  title: string;
  href: string;
  icon: React.ReactElement<SVGProps<SVGSVGElement>>;
};