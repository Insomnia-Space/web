import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface MenuItem {
  title: string;
  url: string;
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  moduleCode: string;
  children?: MenuItem[];
}

export interface Menu {
  label?: string;
  items: MenuItem[];
}
