export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <i className="fas fa-angle-double-right"></i>
        <span>MINN</span>
      </div>
      <div className="icons">
        <i className="fas fa-user-circle"></i>
      </div>
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          padding: 10px 20px;
          background-color: #161b22;
        }
        .logo i {
          font-size: 24px;
          margin-right: 10px;
        }
        .icons i {
          font-size: 20px;
        }
      `}</style>
    </div>
  );
}