export function Loader() {
  return (
    <div style={{ width: '100%' }} className="w-100 d-flex justify-center">
      <div
        className=" h-10 w-10 animate-spin mx-auto rounded-full border-4 flex justify-center border-gray-200 border-t-blue-600"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
