import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="footer">
        &copy; {currentYear} : Anil Neerukonda Institute of Technology and
        Sciences <br />
        Supervised by : Associate Professor Mrs Mallika; &nbsp; Developed by :
        Jammu Ramadevi
      </div>
    </>
  );
}
export default Footer;
