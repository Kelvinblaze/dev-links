const SkeletonText = ({ text, width = 160, height = 16, className }) =>
  !text || !text.trim() ? (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="bg-[#EEEEEE] rounded-full animate-pulse"
    />
  ) : (
    <span className={className}>{text}</span>
  );

export default SkeletonText;
