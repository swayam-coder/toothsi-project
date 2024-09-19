import { Col, Row } from 'antd';
import CartTable from '../components/CartTable';
import CartBox from '../components/CartBox';

const Checkout: React.FC = () => {
  return <Row gutter={16}>
    <Col span={18}><CartTable /></Col>
    <Col span={6}><CartBox /></Col>
  </Row>;
};

export default Checkout;
