const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <p className="heading">Where in the world?</p>
        <button className="theme-toggler">Theme Toggle</button>
      </nav>

      <style jsx>
        {`
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px 10px;
            background-color: #fff;
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            box-shadow: 0 1px 5px rgb(0 0 0 / 20%);
            z-index: 1;
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
        `}
      </style>
    </>
  );
};

export default Navbar;
