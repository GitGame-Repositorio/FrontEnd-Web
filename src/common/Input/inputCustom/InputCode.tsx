import { forwardRef, useState } from "react";

type InputCodeProps = {
  count: number;
};

export const InputCode = forwardRef(
  ({ count, ...rest }: InputCodeProps, ref) => {
    const [inputValues, setInputValues] = useState<string[]>(
      Array(count).fill("")
    );

    const valueCode = inputValues.join("");

    const handleInputChange = (index: number, value: string, type: string) => {
      const newInputValues = [...inputValues];
      const isNumber = /[0-9]/.test(value);

      if (!isNumber && type !== "deleteContentBackward") return null;

      if (isNumber) {
        newInputValues[index] = value;
        const input = document.querySelectorAll("#input-code input")[index + 1];
        input?.focus();
      } else {
        newInputValues[index] = "";
      }

      setInputValues(newInputValues);
    };

    return (
      <div className="flex justify-between gap-3 md:gap-5" id="input-code">
        {inputValues.map((value, index) => (
          <input
            inputMode="numeric"
            pattern="[0-9]"
            value={value}
            type="text"
            key={index}
            onChange={(e) => {
              const { data, inputType } = e.nativeEvent;
              handleInputChange(index, data, inputType);
            }}
            className="input input-code"
          />
        ))}
        <input
          type="number"
          value={valueCode}
          className="hidden"
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);
