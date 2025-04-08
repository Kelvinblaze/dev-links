import { Link, useLocation } from "react-router-dom";

const TabMenu = ({ tabs }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="flex items-center space-x-5">
      {tabs.map((tab, index) => {
        const isActive = currentPath === tab.url;

        return (
          <Link to={tab.url} key={index}>
            <div
              className={`text-grey hover:text-purple px-6 py-3 rounded-lg  font-semibold transition cursor-pointer ${
                isActive ? "bg-light-purple text-purple" : ""
              }`}
            >
              <div className="flex items-center space-x-2">
                <div>{tab.Icon && <tab.Icon className="w-5 h-5" />}</div>
                <span className="md:block hidden">{tab.title}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TabMenu;
