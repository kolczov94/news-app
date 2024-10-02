import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import type { FormProps } from "antd";
import { Header } from "../components/header";
import { useNewsStore } from "../store/store";

type FieldType = {
  title: string;
  content: string;
};

export const CreatePage = () => {
  const addNews = useNewsStore((state) => state.addNews);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Новость добавлена!",
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    addNews(values);
    success();
    form.resetFields();
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
          <Link to={"/"}>
            <Button type="link" icon={<ArrowLeftOutlined />}>
              Вернуться к новостям
            </Button>
          </Link>
        </div>
        <h1 className="mt-4 font-bold text-xl">Добавить новость</h1>
        <Form
          form={form}
          layout="vertical"
          className="mt-4 max-w-[500px] mx-auto"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{}}
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
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </section>
      {contextHolder}
    </main>
  );
};
