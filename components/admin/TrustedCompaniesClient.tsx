"use client";

import { useState, useRef, useTransition } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  saveTrustedCompany,
  deleteTrustedCompany,
  toggleCompanyActive,
  reorderCompanies,
  updateTrustMode,
} from "@/app/admin/actions";

export type Company = {
  id: string;
  name: string;
  logo_url?: string | null;
  tagline?: string | null;
  website_url?: string | null;
  display_order: number;
  is_active: boolean;
};

type Props = {
  companies: Company[];
  trustMode: string;
};

/* ── Blank form state ──────────────────────────────────────── */
const blank = (): Omit<Company, "id"> => ({
  name: "",
  logo_url: "",
  tagline: "",
  website_url: "",
  display_order: 0,
  is_active: true,
});

export default function TrustedCompaniesClient({ companies: initial, trustMode }: Props) {
  const [companies, setCompanies] = useState<Company[]>(initial);
  const [mode, setMode] = useState(trustMode);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Company | null>(null);
  const [form, setForm] = useState<Omit<Company, "id">>(blank());
  const [err, setErr] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /* ── Open form for add/edit ─────────────────────────────── */
  function openAdd() {
    setEditing(null);
    setForm(blank());
    setShowForm(true);
    setErr(null);
  }

  function openEdit(c: Company) {
    setEditing(c);
    setForm({
      name: c.name,
      logo_url: c.logo_url || "",
      tagline: c.tagline || "",
      website_url: c.website_url || "",
      display_order: c.display_order,
      is_active: c.is_active,
    });
    setShowForm(true);
    setErr(null);
  }

  /* ── Drag & Drop ────────────────────────────────────────── */
  function handleDragStart(id: string) {
    setDragId(id);
  }

  function handleDragOver(e: React.DragEvent, id: string) {
    e.preventDefault();
    setDragOverId(id);
  }

  function handleDrop(targetId: string) {
    if (!dragId || dragId === targetId) {
      setDragId(null);
      setDragOverId(null);
      return;
    }
    const reordered = [...companies];
    const fromIdx = reordered.findIndex((c) => c.id === dragId);
    const toIdx = reordered.findIndex((c) => c.id === targetId);
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    const updated = reordered.map((c, i) => ({ ...c, display_order: i }));
    setCompanies(updated);
    setDragId(null);
    setDragOverId(null);

    /* Persist order */
    const fd = new FormData();
    fd.set("order", JSON.stringify(updated.map((c) => ({ id: c.id, display_order: c.display_order }))));
    startTransition(() => { reorderCompanies(fd); });
  }

  /* ── Toggle active ──────────────────────────────────────── */
  function handleToggle(c: Company) {
    setCompanies((prev) =>
      prev.map((x) => x.id === c.id ? { ...x, is_active: !x.is_active } : x)
    );
    const fd = new FormData();
    fd.set("id", c.id);
    fd.set("is_active", String(c.is_active));
    startTransition(() => { toggleCompanyActive(fd); });
  }

  /* ── Delete ─────────────────────────────────────────────── */
  function handleDelete(c: Company) {
    if (!confirm(`Delete "${c.name}"? This cannot be undone.`)) return;
    setCompanies((prev) => prev.filter((x) => x.id !== c.id));
    const fd = new FormData();
    fd.set("id", c.id);
    startTransition(() => { deleteTrustedCompany(fd); });
  }

  /* ── Mode toggle ────────────────────────────────────────── */
  function handleModeChange(newMode: string) {
    setMode(newMode);
    const fd = new FormData();
    fd.set("mode", newMode);
    startTransition(() => { updateTrustMode(fd); });
  }

  /* ── Preview ────────────────────────────────────────────── */
  const active = companies.filter((c) => c.is_active);

  return (
    <div className="tc-shell">
      {/* ── Header bar ─────────────────────────────────────── */}
      <div className="tc-topbar">
        <div className="tc-topbar-left">
          <h2 className="tc-title">Trusted Companies</h2>
          <span className="tc-count">{companies.length} total · {active.length} active</span>
        </div>
        <div className="tc-topbar-right">
          <button className="a-btn a-btn-primary" onClick={openAdd}>
            + Add Company
          </button>
        </div>
      </div>

      {/* ── Mode switcher ──────────────────────────────────── */}
      <div className="tc-mode-bar">
        <span className="tc-mode-label">About page display:</span>
        <div className="tc-mode-btns">
          <button
            className={`tc-mode-btn ${mode === "marquee" ? "active" : ""}`}
            onClick={() => handleModeChange("marquee")}
            type="button"
          >
            📜 Text Marquee
          </button>
          <button
            className={`tc-mode-btn ${mode === "logos" ? "active" : ""}`}
            onClick={() => handleModeChange("logos")}
            type="button"
          >
            🏢 Logo Slider
          </button>
        </div>
        {pending && <span className="tc-saving">Saving…</span>}
      </div>

      {/* ── Add / Edit Form ────────────────────────────────── */}
      {showForm && (
        <div className="tc-modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setShowForm(false);
        }}>
          <div className="tc-modal">
            <div className="tc-modal-header">
              <h3>{editing ? "Edit Company" : "Add Company"}</h3>
              <button className="tc-modal-close" onClick={() => setShowForm(false)}>✕</button>
            </div>

            <form
              ref={formRef}
              action={saveTrustedCompany}
              className="tc-form"
              onSubmit={() => setShowForm(false)}
            >
              {editing && <input type="hidden" name="id" value={editing.id} />}
              {err && <div className="tc-err">{err}</div>}

              <div className="a-field">
                <label>Company Name *</label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Acme Corp"
                />
              </div>

              <ImageUploader
                label="Company Logo"
                value={form.logo_url || ""}
                onChange={(url) => setForm({ ...form, logo_url: url })}
              />
              <input type="hidden" name="logo_url" value={form.logo_url || ""} />

              <div className="a-field">
                <label>Short Tagline (optional)</label>
                <input
                  name="tagline"
                  value={form.tagline || ""}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="e.g. Fortune 500 Partner"
                />
              </div>

              <div className="a-field">
                <label>Website URL (optional)</label>
                <input
                  name="website_url"
                  type="url"
                  value={form.website_url || ""}
                  onChange={(e) => setForm({ ...form, website_url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className="a-row">
                <div className="a-field" style={{ flex: 1 }}>
                  <label>Display Order</label>
                  <input
                    name="display_order"
                    type="number"
                    min={0}
                    value={form.display_order}
                    onChange={(e) => setForm({ ...form, display_order: +e.target.value })}
                  />
                </div>
                <div className="a-field a-field-check">
                  <label className="a-check-row">
                    <input
                      name="is_active"
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                    />
                    <span>Active</span>
                  </label>
                </div>
              </div>

              <div className="tc-form-actions">
                <button type="submit" className="a-btn a-btn-primary" disabled={pending}>
                  {editing ? "Save Changes" : "Add Company"}
                </button>
                <button type="button" className="a-btn" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Company Table ───────────────────────────────────── */}
      {companies.length === 0 ? (
        <div className="tc-empty">
          <span>No companies yet.</span>
          <button className="a-btn a-btn-primary" onClick={openAdd}>Add your first company</button>
        </div>
      ) : (
        <div className="tc-table-wrap">
          <table className="tc-table">
            <thead>
              <tr>
                <th>⠿</th>
                <th>Logo</th>
                <th>Name</th>
                <th>Tagline</th>
                <th>Website</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr
                  key={c.id}
                  className={`tc-row ${dragOverId === c.id ? "tc-row--over" : ""} ${dragId === c.id ? "tc-row--dragging" : ""}`}
                  draggable
                  onDragStart={() => handleDragStart(c.id)}
                  onDragOver={(e) => handleDragOver(e, c.id)}
                  onDrop={() => handleDrop(c.id)}
                  onDragEnd={() => { setDragId(null); setDragOverId(null); }}
                >
                  <td className="tc-drag-handle" title="Drag to reorder">⠿</td>
                  <td>
                    {c.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.logo_url} alt={c.name} className="tc-logo-thumb" />
                    ) : (
                      <div className="tc-logo-initials">{c.name.slice(0, 2).toUpperCase()}</div>
                    )}
                  </td>
                  <td className="tc-name">{c.name}</td>
                  <td className="tc-muted">{c.tagline || "—"}</td>
                  <td>
                    {c.website_url ? (
                      <a href={c.website_url} target="_blank" rel="noopener noreferrer" className="tc-link">
                        {new URL(c.website_url).hostname}
                      </a>
                    ) : "—"}
                  </td>
                  <td>
                    <button
                      className={`tc-toggle ${c.is_active ? "tc-toggle--on" : "tc-toggle--off"}`}
                      onClick={() => handleToggle(c)}
                      title={c.is_active ? "Click to deactivate" : "Click to activate"}
                      type="button"
                    >
                      {c.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="tc-actions">
                    <button className="tc-action-btn" onClick={() => openEdit(c)} title="Edit">✏️</button>
                    <button className="tc-action-btn tc-action-btn--del" onClick={() => handleDelete(c)} title="Delete">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="tc-hint">Drag rows to reorder · Changes save automatically</p>
        </div>
      )}

      {/* ── Live Preview ────────────────────────────────────── */}
      <div className="tc-preview-box">
        <div className="tc-preview-header">
          <span className="tc-preview-title">Live Preview — {mode === "logos" ? "Logo Slider" : "Text Marquee"}</span>
          <span className="tc-preview-note">Reflects your current settings</span>
        </div>
        <div className="tc-preview-inner">
          {mode === "marquee" ? (
            <div className="tc-preview-marquee">
              {["🌍 Trusted by businesses worldwide", "⚡ Building scalable software solutions", "🤖 AI-Powered Applications", "🚀 Fast Delivery & Reliable Support", "🔒 Secure & Scalable Applications"].map((t, i) => (
                <span key={i} className="tc-preview-item">{t} <span className="tc-preview-sep">·</span></span>
              ))}
            </div>
          ) : (
            <div className="tc-preview-logos">
              {active.length > 0 ? active.map((c) => (
                <div key={c.id} className="tc-preview-card">
                  {c.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.logo_url} alt={c.name} className="tc-preview-logo-img" />
                  ) : (
                    <span className="tc-preview-initials">{c.name.slice(0, 2).toUpperCase()}</span>
                  )}
                  <span className="tc-preview-name">{c.name}</span>
                </div>
              )) : (
                <span className="tc-preview-empty">No active companies. Add some above.</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
