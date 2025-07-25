import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import { LinkIcon } from 'lucide-react';

type InputWithIconProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    icon?: React.ReactNode;
    containerClassName?: string;
    inputWrapperClassName?: string;
    iconClassName?: string;
};

const InputField = forwardRef(
    (
        {
            label,
            icon = <LinkIcon className="h-5 w-5" />,
            containerClassName = '',
            iconClassName = '',
            className = '',
            id,
            ...props
        }: InputWithIconProps,
        ref: ForwardedRef<HTMLInputElement>
    ) => {

        return (
            <div className={containerClassName}>
                {label && (
                    <label
                        htmlFor="input field"
                        className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2`}
                    >
                        {label}
                    </label>
                )}

                <div className={`flex`}>
                    <span
                        className={`inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 ${iconClassName}`}
                    >
                        {icon}
                    </span>
                    <input
                        id='input field'
                        type='text'
                        ref={ref}
                        className={`flex-1 min-w-0 block w-full bg-gray-100 text-gray-900 px-3 py-2 rounded-none rounded-r-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 focus:outline-none  ${className}`}
                        {...props}
                    />
                </div>
            </div>
        );
    }
);

export default InputField;