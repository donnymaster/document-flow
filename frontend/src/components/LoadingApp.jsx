import { Spin, Row, Col, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingApp = () => {
  const sizeSpinner = 52;
    
  return (
    <Row align="middle" justify="center" style={{height: '100vh'}}>
      <Col>
        <Row align="middle" style={{flexDirection: 'column'}}>
          <Col><Spin indicator={<LoadingOutlined style={{ fontSize: sizeSpinner }} spin />} /></Col>
            <Col style={{marginTop: '10px'}}>
              <Typography.Title level={5}>
                  Loading app...
              </Typography.Title>
            </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default LoadingApp;