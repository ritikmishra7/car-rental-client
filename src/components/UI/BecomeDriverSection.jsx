import React, { useState } from "react";
import "../../styles/become-driver.css";
import { Container, Row, Col } from "reactstrap";

import driverImg from "../../assets/all-images/toyota-offer-2.png";
import { Form, Input, Modal, Select, Upload, message } from "antd";
import { axiosClient } from '../../config/axios'
const { Option } = Select;


const BecomeDriverSection = () => {

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileWithURL, setFileWithURL] = useState([]);
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [form] = Form.useForm();

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleFileUpload = async (options) => {
    const { onSuccess, onError, file } = options;
    const formData = new FormData();
    formData.append('files', file);
    try {
      const response = await axiosClient.post('/vehicle/add-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      onError('File upload failed.');

      onSuccess(message.success(`${file.name} file uploaded successfully.`));
      const newFileDetails = {
        publicId: response?.data?.result?.public_id,
        url: response?.data?.result?.url,
        name: file.name
      }

      setFileWithURL([...fileWithURL, newFileDetails]);

    } catch (error) {
      message.error(`${file.name} file upload failed.`);
    }
  }

  const handleFileRemove = async (file) => {
    try {
      const fileDetails = fileWithURL.find((item) => item.name === file.name);
      if (fileDetails?.publicId) {
        const response = await axiosClient.delete(`/vehicle/delete-picture`, {
          publicId: fileDetails?.publicId
        });

        if (response.data.status === 'ok') {
          message.success(`${file.name} file removed successfully.`);
        }
        else {
          message.error(`Unknown error occurred`);
        }
        const newFileList = fileWithURL.filter((item) => item.name !== file.name);
        setFileWithURL(newFileList);
      }
      else
        message.error(`Unknown error occurred`);
    } catch (error) {

      message.error(`${error.message}`);
    }

  }

  const uploadButton = (
    <div>
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleAddCar = async () => {
    setConfirmLoading(true);
    try {
      await form.validateFields();
      const data = form.getFieldsValue();
      console.log(data);
      setConfirmLoading(false);
      console.log(fileWithURL)
      if (fileWithURL.length === 0) {
        message.error('Please upload atleast one image')
        return;
      }

      data.image = fileWithURL;
      console.log(data);
      const response = await axiosClient.post('/vehicle/add-vehicle', data);
      if (response.data.status === 'ok') {
        message.success('Vehicle added successfully');
        form.resetFields();
        setFileWithURL([]);
        setDefaultFileList([]);
        setOpen(false);
      }
      else {
        message.error('Error occurred while adding vehicle');
        form.resetFields();
        setFileWithURL([]);
        setOpen(false);
        setDefaultFileList([]);
      }


    } catch (error) {
      form.resetFields();
      setFileWithURL([]);
      setOpen(false);
    }
  }

  const handleCancel = () => {
    setDefaultFileList([]);
    form.resetFields();
    setFileWithURL([]);
    setOpen(false);
  }
  return (
    <section className="become__driver">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12" className="become__driver-img">
            <img src={driverImg} alt="" className="w-100" />
          </Col>

          <Col lg="6" md="6" sm="12">
            <h2 className="section__title become__driver-title">
              Do You Want to Earn With Us? So Don't Be Late
            </h2>

            <button className="btn become__driver-btn mt-4" onClick={() => setOpen(true)}>
              List your car
            </button>
            <Modal
              title="Add your vehicle"
              open={open}
              onOk={handleAddCar}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              destroyOnClose={true}
              width={550}
            >
              <Form
                name="basic"
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={handleAddCar}
                onFinishFailed={handleCancel}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  label="Brand"
                  name="brand"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your brand of vehicle!',
                    },
                  ]}
                >
                  <Input placeholder="Brand Name" />
                </Form.Item>
                <Form.Item
                  label="Model"
                  name="model"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter model of your vehicle!',
                    },
                  ]}
                >
                  <Input placeholder="Please enter model of your vehicle" />
                </Form.Item>
                <Form.Item
                  label="Registration Number"
                  name="registration_number"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter registration number of your vehicle!',
                    },
                  ]}
                >
                  <Input placeholder="Please enter regn. no. of your vehicle" />
                </Form.Item>
                <Form.Item
                  label="Price/Day"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter expected price/day!',
                    },
                  ]}
                >
                  <Input type="Number" placeholder="Please enter expected price/day of your vehicle" />
                </Form.Item>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter category!',
                    },
                  ]}
                >
                  <Select
                    style={{
                      width: 145,
                      margin: '0 8px',
                    }}
                    placeholder="Select a category"
                  >
                    <Option value="car">Car</Option>
                    <Option value="suv">SUV</Option>
                    <Option value="van">Van</Option>
                  </Select>
                </Form.Item >
                <Form.Item
                  label="Fuel"
                  name="fuel"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter fuel!',
                    },
                  ]}
                >
                  <Select
                    style={{
                      width: 145,
                      margin: '0 8px',
                    }}
                    placeholder="Select a fuel"
                  >
                    <Option value="petrol">Petrol</Option>
                    <Option value="diesel">Diesel</Option>
                    <Option value="electric">Electric</Option>
                  </Select>
                </Form.Item >
                <Form.Item
                  label="Images"
                  rules={[
                    {
                      required: true,
                      message: 'Please upload vehicle images!',
                    },
                  ]}
                  required={true}
                >
                  <div>
                    <Upload
                      name="vehicle-description"
                      listType="picture-card"
                      className="vehicle-uploader"
                      customRequest={handleFileUpload}
                      fileList={defaultFileList}
                      onChange={({ file, fileList }) => { setDefaultFileList(fileList); }}
                      onRemove={(file) => handleFileRemove(file)}
                      maxCount={4}
                      onPreview={handlePreview}
                    >
                      {defaultFileList.length >= 4 ? null : uploadButton}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                      <img
                        alt="example"
                        style={{
                          width: '100%',
                        }}
                        src={previewImage}
                      />
                    </Modal>
                  </div>
                </Form.Item>
              </Form>
            </Modal>
          </Col>
        </Row>
      </Container>
    </section >
  );
};

export default BecomeDriverSection;
