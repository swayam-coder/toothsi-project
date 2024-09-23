import { Col, Row } from 'antd';
import CartTable from '../components/CartTable';
import CartBox from '../components/CartBox';

const Checkout: React.FC = () => {
  return <Row gutter={[16, 16]}>
    <Col xs={24} sm={24} md={18} span={18}><CartTable /></Col>
    <Col xs={24} sm={24} md={6} span={6}><CartBox /></Col>
  </Row>;
};

export default Checkout;
