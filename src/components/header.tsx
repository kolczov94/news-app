import { AppstoreAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button } from "antd";

export const Header = () => {
  // const location = useLocation();
  return (
    <header className="container py-2 flex items-center justify-between bg-slate-800 sticky top-0 shadow-md">
      <Link to="/">
        <div className="text-lg font-bold text-white">Новости</div>
      </Link>
      <Link to="/create">
        <Button type="primary" icon={<AppstoreAddOutlined />} size="small">
          Добавить новость
        </Button>
      </Link>
    </header>
  );
};
