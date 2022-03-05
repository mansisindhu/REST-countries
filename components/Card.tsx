const Card = ({ cardData }) => {
  return (
    <>
      <div className="card">
        <img className="flag" src={cardData.flags.png} alt="flag" />
        <div className="details">
          <p className="name">{cardData.name.common}</p>
          <div className="info-section">
            <p className="info">
              Population: <span>{cardData.population.toLocaleString()}</span>
            </p>
            <p className="info">
              Region: <span>{cardData.region}</span>
            </p>
            <p className="info">
              Capital: <span>{cardData.capital}</span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .card {
            height: 320px;
            width: 268px;
            box-shadow: 0 1px 5px #00000033;
            border-radius: 8px;
          }

          .flag {
            width: 100%;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            height: 150px;
            object-fit: cover;
          }

          .details {
            padding: 18px;
          }

          .name {
            font-weight: 800;
            font-size: 17px;
          }

          .info-section {
            margin-top: 18px;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .info {
            font-size: 14px;
            font-weight: 600;
          }

          .info > span {
            font-weight: 200;
          }
        `}
      </style>
    </>
  );
};

export default Card;
