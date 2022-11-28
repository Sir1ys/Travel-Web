import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Home from "./pages/home/Home";
import Events from "./pages/events/Events";
import Packages from "./pages/packages/Packages";
import Reviews from "./pages/reviews/Reviews";
import Login from "./pages/login/Login";
import Payment from "./pages/payment/Payment";
import Layout from "./Layout";
import { uploadEvents } from "./store/slices/eventSlice/eventSlice";
import { uploadReviews } from "./store/slices/reviewSlice/reviewSlice";
import { uploadPackages } from "./store/slices/packageSlice/packageSlice";
import { uploadUsers } from "./store/slices/userSlice/userSlice";
import { useAuth } from "./hooks/useAuth";
import Loader from "./components/loader/Loader";

function App() {
  const dispatch = useDispatch();

  const { isAuth } = useAuth();

  const RequireAuth = ({ children }) => {
    return isAuth ? children : <Navigate to="/login" />;
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const events = (await getDocs(collection(db, "events"))).docs.map(
          (doc) => ({ id: doc.id, ...doc.data() })
        );
        const reviews = (await getDocs(collection(db, "reviews"))).docs.map(
          (doc) => ({ id: doc.id, ...doc.data() })
        );
        const packages = (await getDocs(collection(db, "packages"))).docs.map(
          (doc) => ({ id: doc.id, ...doc.data() })
        );
        const users = (await getDocs(collection(db, "users"))).docs.map(
          (doc) => ({ id: doc.id, ...doc.data() })
        );

        dispatch(uploadEvents({ events }));
        dispatch(uploadReviews({ reviews }));
        dispatch(uploadPackages({ packages }));
        dispatch(uploadUsers({ users }));

        setTimeout(() => {
          setLoading(false);
        }, 1000)
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

  return (
    <>
      {
        loading ? <Loader/> : null
      }
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/payment"
            element={
              <RequireAuth>
                <Payment />
              </RequireAuth>
            }
          />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
