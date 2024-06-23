export default function InputTag({
  id,
  name,
  type,
  autoComplete,
  required = false,
  value,
  onChange,
}: any) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={required}
      value={value}
      onChange={onChange}
      className="block w-full rounded-md border-2 focus:border-primary outline-none px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
    />
  );
}
