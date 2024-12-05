import { NavLink, Outlet } from "react-router";

export default function FrontLayout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "pink",
          width: "100%",
        }}
      >
        <span>Super Site</span>
        <div style={{ display: "flex", gap: "5px" }}>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
          <NavLink to={"/admin"}>Admin</NavLink>
        </div>
      </nav>
      <main style={{ backgroundColor: "yellow", flex: 1, width: "100%" }}>
        <h1>Front</h1>
        <Outlet />
      </main>
    </div>
  );
}
