import { NavLink, Outlet } from "react-router";

export default function BackLayout() {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
    >
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          backgroundColor: "pink",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            flexBasis: "25%",
          }}
        >
          <span>Super Site</span>
          <NavLink to="/">Home</NavLink>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/products">Products</NavLink>
        </div>
      </nav>
      <main style={{ backgroundColor: "yellow", flex: 1, height: "100%" }}>
        <h1>Back</h1>
        <Outlet />
      </main>
    </div>
  );
}
