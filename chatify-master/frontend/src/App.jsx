import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";

import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="h-[100dvh] relative flex items-center justify-center p-3 md:p-4 overflow-hidden box-border">
      {/* BACKGROUND: layered gradients + subtle line pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_5%_0%,rgba(16,185,129,0.26),transparent_55%),radial-gradient(110%_80%_at_95%_100%,rgba(56,189,248,0.22),transparent_60%),linear-gradient(160deg,#020617_0%,#0f172a_45%,#111827_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-30" />
      <div className="absolute -top-16 left-16 size-80 rounded-full bg-emerald-300/20 blur-[120px]" />
      <div className="absolute -bottom-20 right-10 size-96 rounded-full bg-sky-300/20 blur-[130px]" />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Routes>
          <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        </Routes>
      </div>

      <Toaster />
    </div>
  );
}
export default App;
