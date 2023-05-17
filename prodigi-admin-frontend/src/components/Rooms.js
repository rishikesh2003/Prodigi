import { rooms } from "./data";
import RoomCard from "./RoomCard";

function Rooms(props) {
  return (
    <div className="card-container">
      {props.data &&
        rooms.map((room, index) => (
          <RoomCard key={index} name={room.n} data={props.data} />
        ))}
    </div>
  );
}

export default Rooms;
