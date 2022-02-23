type ButtonSubmitProps = {
  children: JSX.Element;
};

export default function ButtonSubmit({ children }: ButtonSubmitProps) {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      >
        {children}
      </button>
    </div>
  )
}