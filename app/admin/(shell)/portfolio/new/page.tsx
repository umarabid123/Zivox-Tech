import PortfolioForm from "@/components/admin/PortfolioForm";
import Link from "next/link";

export default function NewPortfolio() {
  return (
    <div className="a-card">
      <div className="a-top" style={{ marginBottom: 20, paddingBottom: 12 }}>
        <h2 className="a-h1" style={{ fontSize: 18, margin: 0 }}>
          Add New Project
        </h2>
        <Link className="a-btn secondary" href="/admin/portfolio">
          ← Back to Portfolio
        </Link>
      </div>
      <PortfolioForm />
    </div>
  );
}
