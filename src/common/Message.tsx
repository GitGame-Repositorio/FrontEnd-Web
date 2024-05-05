type MessageProps = {
  text: string;
  className: React.ComponentProps<"div">["className"];
};

export const Message = ({ text, className }: MessageProps) => {
  const classDiv =
    "max-h-20 w-full pr-1 max-w-128 rounded-2xl flex gap-5 bg-primary-50 absolute animate-message";
  return (
    <div className={`${classDiv} ${className}`}>
      <div className="h-full absolute w-4 bg-primary-500 rounded-l-2xl"></div>
      <div className="flex items-center gap-4">
        <img src="/check.svg" className="h-6" />
        <p className="text-primary-500 text-2xl font-bold py-4 2xl:py-5">{text}</p>
      </div>
    </div>
  );
};
