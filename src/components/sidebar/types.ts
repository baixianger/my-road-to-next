import { SVGProps } from "react";

export type NavItem = {
  separator?: boolean;
  title: string;
  href: string;
  icon: React.ReactElement<SVGProps<SVGSVGElement>>;
};