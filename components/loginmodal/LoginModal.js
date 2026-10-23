'use client'
import { useState } from "react";
import Image from "next/image";
import "@/styles/LoginModal.css";
import { FaUser, FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { closeModal } from "@/redux/slices/loginModal";
import SignUpModal from "./SignUpModal";
import ResetPasswordModal from "./ResetPasswordModal";
import { login, googleSignIn, loginGuest } from "@/firebase/firebase";



const LoginModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetPassword, setResetPassword] = useState(false)

  const onLoginSuccess = () => {
    dispatch(closeModal())
    // From the landing page go into the app; elsewhere (e.g. checkout) stay where the user was
    if (pathname === '/') router.push('/for-you')
  }

  const handleLogin = async () => {
    const ok = await login(email, password)
    if (ok) onLoginSuccess()
  }

  const handleGuestLogin = async () => {
    const ok = await loginGuest()
    if (ok) onLoginSuccess()
  }

  const handleGoogleLogin = async () => {
    const ok = await googleSignIn()
    if (ok) onLoginSuccess()
  }


  if (showSignUp){
    return <SignUpModal/>
  }

  if (resetPassword) {
    return <ResetPasswordModal />
  }

  return (
    <>
    <div className="outer_modal">
      <div className="login_wrapper">
        <div className="login_auth">

          <button className="close_Lgn" onClick={() => dispatch(closeModal())}>
          <FaXmark className="close_Icn" />
          </button>

          <h2 className="login_title">Log in to Summarist</h2>

          <figure className="loginBtn guest_login">
            <div className="img__wrapper">
            <FaUser className="guest_icon" />
            </div>
            <button className="loginTxt" onClick={handleGuestLogin}>Login as Guest</button>
          </figure>

          <div className="authSep__wrapper">
          <div className="authSeperator"></div>
          <p>or</p>
          <div className="authSeperator"></div>
          </div>

          <figure className="loginBtn google_login">
            <div className="gglBtn">
            <Image className="btnImg" src={"/google.png"} width={15} height={15} alt="google" />
            </div>
            <button className="loginTxt" onClick={handleGoogleLogin}>Login with Google</button>
          </figure>

          <div className="authSep__wrapper">
            <div className="authSeperator"></div>
            <p>or</p>
            <div className="authSeperator"></div>
          </div>

          <input
            className="userInfo_input"
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="userInfo_input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="LoginBtn" onClick={handleLogin}>Login</button>
        </div>

        <div className="restore_acct-wrapper">
        <button className="pwReset" onClick={() => setResetPassword(true)}>Forgot your password?</button>

        <button className="signupBtn" onClick={() => setShowSignUp(true)}>Don&apos;t have an account?</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginModal;
