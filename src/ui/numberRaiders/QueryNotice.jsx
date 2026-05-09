export default function QueryNotice({ loading, error, fallback }) {
  if (!loading && !error && !fallback) return null;

  return (
    <div
      className="px-badge badge-rust"
      style={{ marginBottom: 12, lineHeight: 1.6 }}
    >
      {loading
        ? "SYNCING FIREBASE..."
        : error
          ? "FIREBASE UNAVAILABLE - SHOWING LOCAL DATA"
          : "NO FIREBASE DATA YET - SHOWING LOCAL DATA"}
    </div>
  );
}
