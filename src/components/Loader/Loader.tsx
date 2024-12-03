// Componente de Loading
const Loader = () => {
  return (
    <div className="relative flex h-screen items-center justify-center">
      <div className="h-24 w-24">
        <svg className="h-full w-full animate-rotate" viewBox="25 25 50 50">
          <circle
            className="path animate-dash stroke-current text-red-500"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
