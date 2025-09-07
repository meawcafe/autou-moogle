export default function ComposeInput({
  label,
  placeholder,
  value,
  onChange,
  readonly = false,
}: {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  readonly?: boolean;
}) {
  return (
    <div className="flex relative">
      {label && (
        <span className="absolute left-0 top-0 h-10 flex items-center pl-4 text-gray-500">
          {label}
        </span>
      )}
      <input
        type="text"
        className="focus:outline-none pr-4 h-10 w-full focus:border-b-blue-500 border-b border-gray-300"
        style={{ paddingLeft: label ? "3rem" : "1rem" }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readonly}
        placeholder={placeholder || label || ""}
      />
    </div>
  );
}
