const PlaceholderPage = ({ title }) => {
  return (
    <div className="school-page-container">
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h1 style={{ fontSize: '3rem', color: '#fff', marginBottom: '20px' }}>{title}</h1>
        <p style={{ color: 'var(--color-text-light)', fontSize: '1.2rem' }}>
          Bu sayfa yönetim panelinden dinamik olarak beslenmektedir. (İçerik güncellenecektir)
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
