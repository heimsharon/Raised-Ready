import '../assets/styles/Admin.css';

export default function Admin() {
  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <p>View customer orders and manage uploaded designs.</p>

      <div className="admin-section">
        <h2>Recent Orders</h2>
        {/* Placeholder - Replace with mapped JSON data */}
        <pre>{JSON.stringify([{ id: 1, product: 'hoodie', design: 'flag-pr' }], null, 2)}</pre>
      </div>
    </div>
  );
}
