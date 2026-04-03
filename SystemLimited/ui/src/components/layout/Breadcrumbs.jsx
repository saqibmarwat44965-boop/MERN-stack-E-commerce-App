import { useLocation, Link } from "react-router-dom";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <div className="bg-white px-6 py-2 shadow text-sm">
      <Link to="/" className="text-blue-500">Home</Link>
      {paths.map((p, i) => (
        <span key={i}> / {p}</span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
