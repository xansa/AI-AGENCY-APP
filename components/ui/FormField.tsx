import { cn } from "@/lib/utils";

const inputBase =
  "w-full border border-dark-200 rounded-xl px-4 py-3 text-sm bg-white text-dark-900 " +
  "placeholder:text-dark-400 " +
  "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  /** Renders a text input */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** Renders a textarea instead of input */
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  /** Renders a select instead of input */
  selectProps?: React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: { value: string; label: string }[];
    placeholder?: string;
  };
}

export function FormField({
  label,
  required,
  error,
  className,
  inputProps,
  textareaProps,
  selectProps,
}: FormFieldProps) {
  const id =
    inputProps?.id ??
    textareaProps?.id ??
    selectProps?.id ??
    label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-dark-700">
        {label}
        {required && <span className="text-brand-600 ml-0.5">*</span>}
      </label>

      {selectProps ? (
        <select
          {...selectProps}
          id={id}
          className={cn(inputBase, "text-dark-900", selectProps.className)}
        >
          <option value="" className="text-dark-400">{selectProps.placeholder ?? `Selecteer ${label.toLowerCase()}`}</option>
          {selectProps.options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-dark-900 bg-white">
              {opt.label}
            </option>
          ))}
        </select>
      ) : textareaProps ? (
        <textarea
          {...textareaProps}
          id={id}
          className={cn(inputBase, "resize-none", textareaProps.className)}
        />
      ) : (
        <input
          {...inputProps}
          id={id}
          className={cn(inputBase, inputProps?.className)}
        />
      )}

      {error && (
        <p className="text-red-500 text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
