import { Link, useParams } from "react-router-dom";
import { Header } from "../components/header";
import { Button, Divider, Modal } from "antd";
import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNewsStore } from "../store/store";

export const DetailNewsPage = () => {
  const { id } = useParams();
  const { getNews, removeNews } = useNewsStore();
  const news = getNews(id);
  const [modal, contextHolder] = Modal.useModal();

  const confirm = () => {
    modal.confirm({
      title: "Действительно удалить?",
      icon: <ExclamationCircleOutlined />,
      okText: "Удалить",
      okType: "danger",
      okButtonProps: { type: "primary" },
      cancelText: "Отменить",
      onOk: () => removeNews(id),
    });
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="container py-4 flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <Link to="/">
            <Button type="link" icon={<ArrowLeftOutlined />}>
              Вернуться к новостям
            </Button>
          </Link>
        </div>
        {news ? (
          <>
            <div className="mt-4 p-2 bg-white shadow-md rounded-md">
              <div className="font-bold text-lg">{news.title}</div>
              <Divider className="my-2" />
              <div>{news.content}</div>
              <div className="mt-4 flex flex-col text-xs items-end w-full">
                <div>Создано: {news.createDate}</div>
                {news.createDate !== news.updateDate && (
                  <div>Обновленно: {news.updateDate}</div>
                )}
              </div>
            </div>
            <div className="mt-8 flex gap-4 justify-between">
              <Link to={"/update/" + id}>
                <Button type="primary">Редактировать</Button>
              </Link>
              <Button color="danger" variant="outlined" onClick={confirm}>
                Удалить
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 w-full items-center justify-center text-lg">
            Данная новость отсутствует
          </div>
        )}
      </section>
      {contextHolder}
    </main>
  );
};
