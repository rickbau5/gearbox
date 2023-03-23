import { forwardRef, LegacyRef, CSSProperties } from "react";

interface InputProps {
    name: string,
    className?: string,
    value?: string,
    onChange?: (value: string) => void,
    ref?: LegacyRef<HTMLInputElement>,
    placeholder?: string,
    style?: CSSProperties | undefined
}

const Input = forwardRef((props: InputProps, ref: any) => {
    return ( 
        <input
            name={props.name}
            className={`${props.className} transition-all ease-in-out border-b-2 border-white focus:border-orange text-white placeholder-light-blue outline-none bg-transparent focus:placeholder-opacity-0`}
            style={props.style}
            placeholder={props.placeholder}
            value={props.value}
            onChange={
                (e) => {
                    if (props.onChange) props.onChange(e.target.value)
                }
            }
            ref={ref}
        />
     );
})
 
export default Input;