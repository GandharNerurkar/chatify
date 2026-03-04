import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-6xl h-[calc(100vh-1.5rem)] md:h-[calc(100vh-2rem)] max-h-[760px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col md:flex-row bg-slate-950/55 backdrop-blur-xl">
            {/* FORM CLOUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-6 md:p-10 flex items-center justify-center md:border-r border-emerald-200/10 bg-[linear-gradient(160deg,rgba(2,6,23,0.9),rgba(15,23,42,0.75))]">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <div className="mx-auto mb-4 size-14 rounded-2xl bg-emerald-400/15 border border-emerald-300/35 flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.2)]">
                    <MessageCircleIcon className="w-7 h-7 text-emerald-200" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-100 mb-2">Welcome Back</h2>
                  <p className="text-slate-300/80">Sign in and continue your conversations.</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input"
                        placeholder="example@gmail.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button className="auth-btn mt-2" type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="mt-5 text-center">
                  <Link to="/signup" className="auth-link">
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-8 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.2),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(56,189,248,0.2),transparent_40%),linear-gradient(170deg,rgba(2,6,23,0.3),rgba(12,74,110,0.15))]">
              <div className="w-full max-w-md">
                <img
                  src="/login.png"
                  alt="People using mobile devices"
                  className="w-full h-auto max-h-[320px] object-contain drop-shadow-[0_20px_45px_rgba(2,6,23,0.8)]"
                />
                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-semibold text-slate-100">Focused Messaging</h3>
                  <p className="mt-2 text-slate-200/80">Clear interface, secure sessions, instant replies.</p>

                  <div className="mt-5 flex justify-center gap-3 flex-wrap">
                    <span className="auth-badge">Reliable</span>
                    <span className="auth-badge">Realtime</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
export default LoginPage;
