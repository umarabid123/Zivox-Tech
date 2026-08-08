import { notFound } from "next/navigation";
import { supabaseService } from "@/lib/supabase/server";
import TeamForm from "@/components/admin/TeamForm";

export const dynamic = "force-dynamic";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
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

  // Prevent uuid formatting syntax errors in Postgres
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  if (!isUuid) {
    notFound();
  }

  const { data: member } = await supabaseService()
    .from("team_members")
    .select("*")
    .eq("id", id)
    .single();

  if (!member) {
    notFound();
  }

  return (
    <div className="a-card">
      <div className="a-top" style={{ marginBottom: 20, paddingBottom: 12 }}>
        <h2 className="a-h1" style={{ fontSize: 18 }}>
          Edit Team Member: {member.name}
        </h2>
      </div>
      <TeamForm row={member} />
    </div>
  );
}
