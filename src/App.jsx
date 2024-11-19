import { useState } from 'react';
import logic from './logic';

import './global.css';

import { Routes, Route, Navigate } from 'react-router-dom';

import { Context } from './useContext';
import { LocationProvider } from './LocationContext';

import Alert from './views/components/Alert/Alert';

import Register from './views/Register';
import Home from './views/Home';
import { Notfound } from './views/Notfound';
import { Login } from './views/Login';

import { CreateAdForm } from './views/CreateAdForm';
import AdPage from './views/AdPage';
import { UpdateAdForm } from './views/UpdateAdForm';
import { MyAccount } from './views/MyAccount';
import { MyAds } from './views/MyAds';
import { MyComments } from './views/MyComments';

function App() {
    const [message, setMessage] = useState(null);

    const handleMessage = (message) => setMessage(message);

    const handleAlertAccept = () => setMessage(null);

    // return (
    //     <Context.Provider value={{ alert: handleMessage }}>
    //         <Routes>
    //             <Route path="/login" element={<RenderLogin />} />
    //             <Route path="/register" element={<RenderRegister />} />
    //             {/* <Route path="/*" element={<Notfound />} /> */}
    //         </Routes>

    //         <LocationProvider>
    //             <Routes>
    //                 <Route path="/" element={<RenderHome />} />

    //                 <Route path="/createad" element={<CreateAdForm />}></Route>
    //                 <Route path="/adpage/:adId" element={<AdPage />}></Route>
    //                 <Route
    //                     path="updateadform/:adId"
    //                     element={<UpdateAdForm />}
    //                 ></Route>

    //                 <Route path="/myaccount" element={<MyAccount />}></Route>

    //                 <Route path="/myads" element={<MyAds />}></Route>

    //                 <Route path="/mycomments" element={<MyComments />}></Route>
    //             </Routes>
    //         </LocationProvider>

    //         {message && (
    //             <Alert message={message} onAccept={handleAlertAccept} />
    //         )}
    //     </Context.Provider>
    // );

    // return (
    //     <Context.Provider value={{ alert: handleMessage }}>
    //         {/* Rutas que no necesitan Location.Provider */}
    //         <Routes>
    //             <Route path="/login" element={<RenderLogin />} />
    //             <Route path="/register" element={<RenderRegister />} />
    //             <Route path="/*" element={<Notfound />} />
    //         </Routes>

    //         {/* Rutas que necesitan Location.Provider */}
    //         <LocationProvider>
    //             <Routes>
    //                 <Route path="/" element={<RenderHome />} />
    //                 <Route path="/createad" element={<CreateAdForm />} />
    //                 <Route path="/adpage/:adId" element={<AdPage />} />
    //                 <Route
    //                     path="/updateadform/:adId"
    //                     element={<UpdateAdForm />}
    //                 />
    //                 <Route path="/myaccount" element={<MyAccount />} />
    //                 <Route path="/myads" element={<MyAds />} />
    //                 <Route path="/mycomments" element={<MyComments />} />
    //             </Routes>
    //         </LocationProvider>

    //         {message && (
    //             <Alert message={message} onAccept={handleAlertAccept} />
    //         )}
    //     </Context.Provider>
    // );

    return (
        <Context.Provider value={{ alert: handleMessage }}>
            <Routes>
                {/* Rutas sin LocationProvider */}
                <Route
                    path="/"
                    element={
                        <LocationProvider>
                            <RenderHome />
                        </LocationProvider>
                    }
                />
                <Route path="/login" element={<RenderLogin />} />
                <Route path="/register" element={<RenderRegister />} />

                {/* Rutas con LocationProvider */}
                <Route
                    path="/*"
                    element={
                        <LocationProvider>
                            <Routes>
                                <Route
                                    path="/createad"
                                    element={<CreateAdForm />}
                                />
                                <Route
                                    path="/adpage/:adId"
                                    element={<AdPage />}
                                />
                                <Route
                                    path="/updateadform/:adId"
                                    element={<UpdateAdForm />}
                                />
                                <Route
                                    path="/myaccount"
                                    element={<MyAccount />}
                                />
                                <Route path="/myads" element={<MyAds />} />
                                <Route
                                    path="/mycomments"
                                    element={<MyComments />}
                                />
                                <Route path="*" element={<Notfound />} />
                            </Routes>
                        </LocationProvider>
                    }
                />
            </Routes>

            {message && (
                <Alert message={message} onAccept={handleAlertAccept} />
            )}
        </Context.Provider>
    );
}

export default App;

const RenderHome = () =>
    logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />;
const RenderLogin = () =>
    logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login />;
const RenderRegister = () =>
    logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register />;
