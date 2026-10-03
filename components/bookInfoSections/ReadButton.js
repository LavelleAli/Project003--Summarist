"use client";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/loginModal";

const ReadButton = ({ id, subscriptionRequired, className, children }) => {
  const router = useRouter();
  const premiumUser = useSelector((state) => state.auth.isPremium);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (

    <button className={className} onClick={() =>
    { if (!user) {return dispatch(openModal())}
      subscriptionRequired && premiumUser !== true
    ? router.push(`/choose-plan`)
    : router.push(`/player/${id}`)

    }}>

      {children}

    </button>
  );
};

export default ReadButton;
