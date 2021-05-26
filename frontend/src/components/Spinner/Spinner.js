import { Spin, Row, Col, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';

const Spinner = ({ size = 24, isHeightMaxView, title }) => {
  const { t } = useTranslation();
  const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />;
  const style = isHeightMaxView ? {height: '100vh'} : {height: '100%'};

  return (
    <Row align="middle" justify="center" style={style}>
      <Col>
        <Row align="middle" style={{flexDirection: 'column'}}>
          <Col><Spin indicator={antIcon} /></Col>
          {title ? (
            <Col style={{marginTop: '10px'}}>
              <Typography.Title level={5}>
                {t(title)}
              </Typography.Title>
            </Col>
          ) : null}
        </Row>
      </Col>
    </Row>
  );
}

export default Spinner;
