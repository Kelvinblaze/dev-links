const SkeletonText = ({ text, width = 160, height = 16, className }) =>
  !text ? (
    <div
      className={`w-[${width}px] h-[${height}px] bg-[#EEEEEE] rounded-full animate-pulse`}
    />
  ) : (
    <span className={className}>{text}</span>
  );

export default SkeletonText;
