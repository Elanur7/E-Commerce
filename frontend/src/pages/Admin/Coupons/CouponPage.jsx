import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CouponPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Kupon Kodu",
      dataIndex: "code",
      key: "code",
      render: (code) => <b>{code}</b>,
    },
    {
      title: "İndirim Oranı",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (text) => <span>%{text}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/coupons/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Kupon Sil"
            description="Kuponu silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCoupon(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons`);
      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Veri Getirme Başarısız.");
      }
    } catch (error) {
      console.log("Veri Hatası:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteCoupon = async (couponId) => {
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Silme İşlemi Başarılı.");
        fetchCoupons();
      } else {
        message.error("Silme İşlemi Başarısız.");
      }
    } catch (error) {
      console.log("Silme Hatası:", error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
      />
    </div>
  );
};

export default CouponPage;
