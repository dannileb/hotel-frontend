import { ScheduleOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import Link from "next/link";

export const RoomCard = ({ room, ...props }) => {
  const description = (
    <>
      <p>
        Кроватей: <span>{room.bedCount}</span>
      </p>
      <p>
        Этажи:{" "}
        <span>
          {room.floor.map(
            (floor, index, floors) =>
              `${floor}${index !== floors.length - 1 ? ", " : ""}`
          )}
        </span>
      </p>
      <p>
        Площадь: <span>{room.area} м²</span>
      </p>
    </>
  );
  return (
    <Link href={`/rooms/${room._id}`}>
      <Card
        {...props}
        hoverable
        className={props.className ?? "w-60"}
        cover={
          <img
            alt="example"
            src={room.images[0]}
            className="h-40 object-cover"
          />
        }
      >
        <Meta title={room.title} description={description} />
      </Card>
    </Link>
  );
};
