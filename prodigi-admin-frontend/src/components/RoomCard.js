function RoomCard(props) {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p>
        No. of People Inside :{" "}
        {props.data[props.name.toLowerCase().split(" ").join("")]}
      </p>
      <p>Intensity : 80%</p>
      <img
        src={`/${props.name.toLowerCase().split(" ").join("-")}.png`}
        alt=""
      />
    </div>
  );
}

export default RoomCard;
