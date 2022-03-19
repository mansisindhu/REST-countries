const Navbar = () => {
  return (
    <>
      <nav className="navbar-wrapper">
        <div className="navbar">
          <p className="heading">Where in the world?</p>
        </div>
      </nav>

      <style jsx>
        {`
          .navbar-wrapper {
            background-color: #fff;
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            box-shadow: 0 1px 5px rgb(0 0 0 / 20%);
            z-index: 2;
            padding: 24px 10px;
          }

          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .heading {
            font-size: 14px;
            font-weight: bold;
          }

          .theme-toggler {
            border: none;
            background-color: #fff;
            font-size: 13px;
          }

          @media (min-width: 768px) {
            .navbar {
              max-width: 1120px;
              margin: auto;
            }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
