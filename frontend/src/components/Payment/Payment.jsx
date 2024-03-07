import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${apiUrl}/api/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Ödeme Başarıyla Oluşturuldu.");
        form.resetFields();
      } else {
        message.error("Ödeme Oluşturulurken Hata Oluştu.");
      }
    } catch (error) {
      console.log("Ödeme Oluşturma Hatası:", error);
    }
    navigate("/");
  };
  return (
    <>
      <h2 style={{ marginLeft: "250px", marginTop: "20px" }}>Ödeme İşlemi</h2>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Email"
          style={{
            marginTop: "20px",
            marginLeft: "250px",
            width: "500px",
          }}
          name="email"
          rules={[
            {
              required: true,
              message: "Lütfen email girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kart Üzerindeki Ad Soyad"
          style={{
            marginTop: "20px",
            marginLeft: "250px",
            width: "500px",
          }}
          name="cardOwner"
          rules={[
            {
              required: true,
              message: "Lütfen kart üzerindeki ad-soyad bilgisini girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kart Numarası"
          style={{
            marginTop: "20px",
            marginLeft: "250px",
            width: "500px",
          }}
          name="cardInformation"
          rules={[
            {
              required: true,
              message: "Lütfen kart numarasını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button
          style={{ marginLeft: "250px" }}
          type="primary"
          htmlType="submit"
        >
          Ödemeyi Tamamla
        </Button>
      </Form>
    </>
  );
};

export default Payment;
