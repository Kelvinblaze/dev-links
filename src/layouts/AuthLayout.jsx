import { Outlet } from "react-router-dom";
import Logo from "../components/layout/Logo";

const AuthLayout = () => {
  return (
    <main className="md:bg-light-grey h-screen p-8 md:p-0 md:grid md:place-content-center">
      <section className="space-y-16 md:space-y-8">
        <div className="md:mx-auto w-max">
          <Logo />
        </div>
        <div className="md:min-w-[500px] ">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
