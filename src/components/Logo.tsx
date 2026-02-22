import Image from "next/image";

export default function Logo({
  className,
  ariaLabel,
}: {
  className?: string;
  ariaLabel: string;
}) {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.png"
        alt={ariaLabel || "Logo"}
        width={200}
        height={200}
        className={`${className} -rotate-[20deg]`}
      />
      {/* <span className={className}>PagesPilot</span> */}
    </div>
  );
}
