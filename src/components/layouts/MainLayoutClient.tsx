
import { Footer, Header } from "components";
import { Outlet } from "react-router-dom";

export const MainLayoutClient = () => {
   // const navigate = useNavigate();


   return (
      <main>
         <Header />
         <div id="main-content">
            <Outlet />
         </div>
         <Footer />
      </main>
   );
};
