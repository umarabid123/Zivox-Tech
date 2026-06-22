import BlogForm from "@/components/admin/BlogForm";

export default function NewBlog() {
  return (
    <div className="a-card">
      <h2 style={{ marginTop: 0 }}>New post</h2>
      <BlogForm />
    </div>
  );
}
