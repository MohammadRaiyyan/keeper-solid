const LoaderIcon = () => {
  return (
    <div class="animate-spin transition">
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg class="w-12 h-12" viewBox="0 0 50 50">
        <circle
          class="stroke-current text-indigo-600"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="4"
          stroke-dasharray="90, 150"
          stroke-dashoffset="0"
        />
      </svg>
    </div>
  );
};

export default LoaderIcon;
