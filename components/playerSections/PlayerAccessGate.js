"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useHasMounted } from "@/hooks/useHasMounted";
import PlayerTitleSkeleton from "./PlayerTitleSkeleton";

// Sends non-premium visitors to the plans page when they open a premium book's
// player directly by URL (the Read/Listen buttons already do this check).
const PlayerAccessGate = ({ subscriptionRequired, children }) => {
  const router = useRouter();
  const hasMounted = useHasMounted();
  const user = useSelector((state) => state.auth.user);
  const initializing = useSelector((state) => state.auth.initializing);
  const isPremium = useSelector((state) => state.auth.isPremium);

  const checking =
    subscriptionRequired && (!hasMounted || initializing || (user && isPremium === null));
  const blocked = subscriptionRequired && !checking && (!user || isPremium !== true);

  useEffect(() => {
    if (blocked) router.replace("/choose-plan");
  }, [blocked, router]);

  if (checking || blocked) return <PlayerTitleSkeleton />;
  return children;
};

export default PlayerAccessGate;
