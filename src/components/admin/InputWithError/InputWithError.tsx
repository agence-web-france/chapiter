import { FieldError } from "react-hook-form";

type InputTextProps = {
  children: React.ReactNode;
  error: FieldError | undefined;
};

export default function InputWithError({ children, error }: InputTextProps) {
  if (error) {
    return (
      <div className="border border-red-600 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 my-4">
        {children}
        <p className="mt-2 text-sm text-red-600">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 my-4">
      {children}
    </div>
  );
}
