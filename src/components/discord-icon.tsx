import type { SVGProps } from 'react';

export function DiscordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.878h-2.54v-2.99h2.54v-2.265c0-2.525 1.5-3.9 3.822-3.9 1.094 0 2.238.195 2.238.195v2.5h-1.396c-1.25 0-1.64.75-1.64 1.57v1.96h2.77l-.443 2.99h-2.327v6.878C19.343 21.128 23 16.991 23 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 1.25.23 2.45.65 3.55" />
      <path d="m9.09 12.3-1.38 4.62 1.6 1.23c.35.27.77.4 1.2.4h3c.43 0 .85-.13 1.2-.4l1.6-1.23-1.38-4.62-1.6-1.23a1.53 1.53 0 0 0-1.8 0Z" />
    </svg>
  );
}
