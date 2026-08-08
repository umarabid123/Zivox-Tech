import TeamForm from "@/components/admin/TeamForm";

export default function NewTeamMemberPage() {
  return (
    <div className="a-card">
      <div className="a-top" style={{ marginBottom: 20, paddingBottom: 12 }}>
        <h2 className="a-h1" style={{ fontSize: 18 }}>
          Add Team Member
        </h2>
      </div>
      <TeamForm />
    </div>
  );
}
