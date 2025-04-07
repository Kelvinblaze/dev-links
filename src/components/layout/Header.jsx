const Header = ({ title, subtitle }) => {
  return (
    <div className="space-y-2">
      <h3 className="md:text-headingM text-2xl text-dark-grey font-bold">
        {title}
      </h3>
      <p className="text-bodyM text-grey">{subtitle}</p>
    </div>
  );
};

export default Header;
