import { forwardRef, InputHTMLAttributes } from "react";

export const InputTextLine = forwardRef(
  (props: InputHTMLAttributes<HTMLInputElement>, ref) => {
    return (
      <div className="relative">
        <input
          max="250"
          className="peer bg-transparent font-medium px-0 py-2 h-0 w-full rounded-none outline-0"
          required
          ref={ref}
          {...props}
        />
        <hr className="invisible peer-hover:visible peer-focus:visible h-px w-0 bg-primary-600 absolute bottom-0 left-0 peer-hover:w-full peer-focus:w-full duration-300" />
      </div>
    );
  }
);
