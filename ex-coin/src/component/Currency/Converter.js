import React, { useState } from "react";
import { Row, Col, InputGroup, Form } from "react-bootstrap";
import { useRoute } from "../../context";

export default function Converter() {
  const routeCoin = useRoute();
  const [coinValue, setCoinValue] = useState(1);
  const [usdValue, setUsdValue] = useState(routeCoin.selectCoin.quote.USD.price.toFixed(5));

  const handleCoinChange = (e) => {
    const coinInput = e.target.value;
    setCoinValue(coinInput);
    setUsdValue(
      (coinInput * routeCoin.selectCoin.quote.USD.price).toFixed(2)
    );
  };

  const handleUsdChange = (e) => {
    const usdInput = e.target.value;
    setUsdValue(usdInput);
    setCoinValue(
      (usdInput / routeCoin.selectCoin.quote.USD.price).toFixed(6)
    );
  };

  return (
    <>
      <Row className="mt-4 fw-bold">
        <Col>{routeCoin.selectCoin.symbol} to USD Converter</Col>
      </Row>
      <Row>
        <Col>
          <InputGroup className="mb-3 mt-3" size="sm">
            <InputGroup.Text id="coin">
              {routeCoin.selectCoin.symbol}
            </InputGroup.Text>
            <Form.Control
              value={coinValue}
              onChange={handleCoinChange}
              id="coinVal"
              aria-describedby="coinVal"
            />
            <InputGroup.Text id="usd">USD</InputGroup.Text>
            <Form.Control
              value={usdValue}
              onChange={handleUsdChange}
              id="usdVal"
              aria-describedby="usdVal"
            />
          </InputGroup>
        </Col>
      </Row>
    </>
  );
}
