import { useFetch } from '../hooks/useFetch';

function ExternalPosts() {
  const { data, loading, error, refetch } = useFetch('/external/posts?limit=4');
  const posts = data?.posts || [];

  return (
    <div>
      <div className="section-header">
        <h2>External API Data (JSONPlaceholder)</h2>
        <button type="button" className="ghost-button" onClick={refetch}>
          Refresh
        </button>
      </div>

      {loading && <p className="status-text">Fetching external posts...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExternalPosts;
