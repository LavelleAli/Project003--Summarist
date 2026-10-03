import SideAndSearchBar from "@/components/SideAndSearchbar/SideAndSearchBar";

export default function MainLayout({ children }) {
  return (
    <>
      <SideAndSearchBar />
      {children}
    </>
  );
}
