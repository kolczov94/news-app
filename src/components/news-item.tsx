import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  date: string;
  id: string;
};

export const NewsItem: FC<PropsWithChildren<Props>> = ({
  title,
  date,
  children,
  id,
}) => {
  return (
    <Link to={"/news/" + id}>
      <div className="group p-2 shadow-md rounded-lg bg-white">
        <div className="text-lg font-medium group-hover:text-blue-500">
          {title}
        </div>
        <div>{children}</div>
        <div className="mt-2 text-xs text-right">{date}</div>
      </div>
    </Link>
  );
};
