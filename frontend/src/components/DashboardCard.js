function DashboardCard({ title, value, bgColor }) {
  const textColor =
    bgColor === "bg-warning" || bgColor === "bg-info"
      ? "text-dark"
      : "text-white";

  return (
    <div className="col-md-3 mb-3">
      <div className={`card ${textColor} ${bgColor}`}>
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <h2 className="fw-bold">{value}</h2>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;