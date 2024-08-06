import { Cormorant ,Open_Sans as OpenSans } from 'next/font/google';
export const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '700'], 
  style: ['normal', 'italic'], 
});

export const openSans = OpenSans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'], 
  style: ['normal', 'italic'],
});
