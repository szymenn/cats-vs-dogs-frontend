import React from 'react';
import axios from 'axios';
import { Button, Input, Upload, message, Table, Typography } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Form from 'antd/lib/form/Form';

const { Title } = Typography;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const url = `https://localhost:5001/api/prediction`;

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const columns = [
      {
          title: 'Predicted Value',
          dataIndex: 'predictedValue'
      },
      {
          title: 'Prediction Time',
          dataIndex: 'predictionTime'
      }
  ]
export class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      predictedValue: null, 
      loading: false,
      predictionHistory: []
    };
  }

  componentDidMount() {
    axios.get(url)
        .then(response => {
            this.setState({predictionHistory: response.data.map((prediction) => {
                var date = new Date(prediction.predictionTime)
                return {
                    predictedValue: prediction.predictedValue,
                    predictionTime: date.toTimeString() + ' ' + date.toDateString() 
                }
            })});
        });
  }

  submit(e) {

    const formData = new FormData();
    formData.append('Image', this.state.file);
    
    console.log(formData);
    console.log(this.state);
    axios.post(`${url}`, formData)
    .then(response => {
        console.log(response.data);
        this.setState({predictedValue: response.data});
        axios.get(url)
        .then(response => {
            this.setState({predictionHistory: response.data.map((prediction) => {
                var date = new Date(prediction.predictionTime)
                return {
                    predictedValue: prediction.predictedValue,
                    predictionTime: date.toTimeString() + ' ' + date.toDateString() 
                }
            })});
        })
    });
    
    console.log(this.state);
  }

  setFile(e) {
    this.setState({ file: e.target.files[0] });
  }

  beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
          file: info.file.originFileObj
        }),
      );
    }
    console.log(info)
    
  };

  render() {
    const uploadButton = (
        <div>
          {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const { imageUrl } = this.state;

      console.log(this.state);
    return (
        <div>
        
      <Form {...layout} onFinish={e => this.submit(e)}>
        <Title>Predicted Value: {this.state.predictedValue}</Title>
        {/* <Input type="file" onChange={e => this.setFile(e)} /> */}
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}>
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}

        </Upload>
        <Button htmlType="submit">Predict</Button>
      </Form>
      <Title level={2}> Prediction History</Title>
      <Table columns={columns} dataSource={this.state.predictionHistory}/>
      
      </div>
    );
  }
}