import { Link, useParams } from "react-router-dom";
import { Header } from "../components/header";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNewsStore } from "../store/store";

type FieldType = {
  title: string;
  content: string;
};

export const UpdatePage = () => {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const updateNews = useNewsStore((state) => state.updateNews);
  const getNews = useNewsStore((state) => state.getNews);

  const news = getNews(id);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Новость обновлена!",
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (id) {
      updateNews(id, values);
      success();
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <main className="min-h-screen">
      <Header />
      <section className="container py-4">
        <div className="flex justify-between items-center">
          <Link to={"/news/" + id}>
            <Button type="link" icon={<ArrowLeftOutlined />}>
              Вернуться к новости
            </Button>
          </Link>
        </div>
        <h1 className="mt-4 font-bold text-xl">Редактировать новость</h1>
        <Form
          layout="vertical"
          className="mt-4 max-w-[500px] mx-auto"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={news}
        >
          <Form.Item<FieldType>
            label="Заголовок"
            name="title"
            rules={[
              { required: true, message: "Заголовок должен быть заполнен!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Контент"
            name="content"
            rules={[
              { required: true, message: "Контент должен быть заполнен!" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item className="flex justify-end mt-8">
            <Button type="primary" htmlType="submit">
              Обновить
            </Button>
          </Form.Item>
        </Form>
      </section>
      {contextHolder}
    </main>
  );
};
