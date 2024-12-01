export default function Footer() {
  return (
    <div className="footer">
      Made with <i className="fas fa-heart"></i> by Minn.
      <style jsx>{`
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #8b949e;
        }
        .footer i {
          color: #ff7b72;
        }
      `}</style>
    </div>
  );
}