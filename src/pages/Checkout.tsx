import { Typography } from "antd";
import { useLocation } from "react-router-dom";

interface LocationState {
  subtotal?: number;
}

const FinalPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  
  return (
    <div>
      <Typography.Title style={{ color: 'white' }}>Thank you for shopping!</Typography.Title>
      <Typography.Paragraph style={{ color: 'white' }}>Total Amount: Rs. {state.subtotal}</Typography.Paragraph>
    </div>
  )
};

export default FinalPage;
