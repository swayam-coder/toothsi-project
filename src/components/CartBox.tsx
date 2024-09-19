import { Button, Card, Col, Row, Typography } from "antd"
import { useCart } from "../context/cart/Cart";
import { useNavigate } from "react-router-dom";

const CartBox: React.FC = () => {
   const cartProducts = useCart();
   const navigate = useNavigate();
   const checkoutList = cartProducts.checkoutList ?? [];

   const subtotal = checkoutList.reduce((prev, curr) => prev + curr.price * curr.quantity, 0).toFixed(2)

    return (
      <Card bordered={false} style={{ width: 300 }}>
        <Typography.Title level={4} style={{ marginTop: 0 }}>Cart total</Typography.Title>
        <Row justify="space-between">
          <Col>
            <Typography.Text>Subtotal</Typography.Text>
          </Col>
          <Col>
            <Typography.Text>Rs. {subtotal}</Typography.Text>
          </Col>
        </Row>
        <Row justify="space-between" style={{ marginTop: '16px' }}>
          <Col>
            <Typography.Title level={5}>Total</Typography.Title>
          </Col>
          <Col>
            <Typography.Title level={5}>Rs. {subtotal}</Typography.Title>
          </Col>
        </Row>
        <Button
          type="primary"
          size="large"
          style={{ marginTop: '16px', width: '100%', backgroundColor: '#003399' }}
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </Button>
      </Card>
    )
}

export default CartBox;
