const Header = ({ title, subtitle }) => {
  return (
    <div className="space-y-2">
      <h3 className="md:text-3xl text-2xl text-dark-grey font-bold">{title}</h3>
      <p className="text-md text-grey">{subtitle}</p>
    </div>
  );
};

export default Header;
