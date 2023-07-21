import React, { useEffect } from "react";
import {
  Row,
  Col,
  Image,
  Container,
  ProgressBar,
  Button,
  Dropdown,
  Spinner
} from "react-bootstrap";
import { useRoute } from "../../context";
import Converter from "./Converter";

export default function Currency() {
  const routeCoin = useRoute();
  const cirPercentage = (
    (routeCoin.selectCoin.circulating_supply /
      routeCoin.selectCoin.max_supply) *
    100
  ).toFixed(2);


  return (
    <>
    {routeCoin.selectCoin === undefined ? (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    ) : (
    <aside className="sidebar border" style={{ fontSize: 12 }}>
      <Container>
        <Row className="align-items-center mb-3 mt-3">
          <Col md={3}>
            <Image
              src={routeCoin.selectCoin.logo}
              roundedCircle
              fluid
              alt="logo"
            />
          </Col>
          <Col className="fw-bold h4">
            {routeCoin.selectCoin.name}
            <span className="text-muted ms-2 fw-normal">
              {routeCoin.selectCoin.symbol}
            </span>
          </Col>
          <Col md={1}>* </Col>
        </Row>
        <Row className="align-items-center">
          <Col md={6} className="fw-bold h2">
            {routeCoin.selectCoin.quote.USD.price < 0.0001 ? (
              <>
                $
                {routeCoin.selectCoin.quote.USD.price.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 8,
                    minimumFractionDigits: 8,
                  }
                )}
              </>
            ) : routeCoin.selectCoin.quote.USD.price < 1 ? (
              <>
                $
                {routeCoin.selectCoin.quote.USD.price.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 4,
                    minimumFractionDigits: 4,
                  }
                )}
              </>
            ) : (
              <>
                $
                {routeCoin.selectCoin.quote.USD.price.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  }
                )}
              </>
            )}
          </Col>
          <Col className="text-end fw-bold">
            {routeCoin.selectCoin.quote.USD.percent_change_1h.toFixed(2)}% (1d)
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>Market cap</Col>
          <Col className="text-end fw-bold">
            $
            {routeCoin.selectCoin.quote.USD.market_cap.toLocaleString(
              undefined,
              {
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            )}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>Volume (24h)</Col>
          <Col className="text-end fw-bold">
            $
            {routeCoin.selectCoin.quote.USD.volume_24h.toLocaleString(
              undefined,
              {
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            )}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={7}>Volume/Market cap (24h)</Col>
          <Col className="text-end fw-bold">
            {(
              routeCoin.selectCoin.quote.USD.volume_24h /
              routeCoin.selectCoin.quote.USD.market_cap
            ).toFixed(2)}
            %
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>Circulating supply</Col>
          <Col className="text-end fw-bold">
            {routeCoin.selectCoin.circulating_supply.toLocaleString(undefined, {
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}{" "}
            {routeCoin.selectCoin.symbol}
          </Col>
        </Row>
        {routeCoin.selectCoin.max_supply && (
          <Row className="mt-1">
            <Col>
              <ProgressBar
                now={cirPercentage}
                style={{ height: "10px" }}
                className="mt-1"
              />
            </Col>
            <Col md={3} className="text-end fw-bold">
              {cirPercentage}%
            </Col>
          </Row>
        )}

        <Row className="mt-3">
          <Col>Total supply</Col>
          <Col className="text-end fw-bold">
            {routeCoin.selectCoin.total_supply.toLocaleString(undefined, {
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}{" "}
            {routeCoin.selectCoin.symbol}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>Max supply</Col>
          <Col className="text-end fw-bold">
            {routeCoin.selectCoin.max_supply ? (
              routeCoin.selectCoin.max_supply.toLocaleString(undefined, {
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              })
            ) : (
              <>Infinity </>
            )}{" "}
            {routeCoin.selectCoin.symbol}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>Fully diluted market cap</Col>
          <Col className="text-end fw-bold">
            $
            {routeCoin.selectCoin.quote.USD.fully_diluted_market_cap.toLocaleString(
              undefined,
              {
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            )}
          </Col>
        </Row>
        <Row className="mt-4 fw-bold">
          <Col>Official links</Col>
        </Row>
        <Row className="mt-3 text-center">
          <Col md={4}>
            {routeCoin.selectCoin.urls.website.length > 1 ? (
              <Dropdown>
                <Dropdown.Toggle variant="light" size="sm" id="dropdown-basic">
                  Website
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {routeCoin.selectCoin.urls.website.map((web) => (
                    <Dropdown.Item key={web} href={web}>
                      {web}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <a href={routeCoin.selectCoin.urls.website}>
                <Button variant="light" size="sm">
                  Website
                </Button>
              </a>
            )}
          </Col>
          {routeCoin.selectCoin.urls.technical_doc.length > 0 && (

          <Col md={4}>
            <a href={routeCoin.selectCoin.urls.technical_doc}>
              <Button variant="light" size="sm">
                Whitepaper
              </Button>
            </a>
          </Col>
            )}
          {routeCoin.selectCoin.urls.source_code.length > 0 && (

          <Col md={4}>
            <a href={routeCoin.selectCoin.urls.source_code}>
              <Button variant="light" size="sm">
                Github
              </Button>
            </a>
          </Col>
            )}

        </Row>
        <Row className="mt-4 fw-bold">
          <Col>Social</Col>
        </Row>
        <Row className="mt-3">
        {routeCoin.selectCoin.urls.twitter.length > 0 && (

          <Col md={4}>

              <a href={routeCoin.selectCoin.urls.twitter}>
                <Button variant="light" size="sm">
                  Twitter
                </Button>
              </a>
          </Col>
            )}
            {routeCoin.selectCoin.urls.reddit.length > 0 && (

          <Col md={4}>
              <a href={routeCoin.selectCoin.urls.reddit}>
                <Button variant="light" size="sm">
                  Reddit
                </Button>
              </a>
          </Col>
            )}
            {routeCoin.selectCoin.urls.chat.length > 0 && (

          <Col md={4}>
              <a href={routeCoin.selectCoin.urls.chat}>
                <Button variant="light" size="sm">
                  Chat
                </Button>
              </a>
          </Col>
            )}

        </Row>
        <Row className="mt-4 fw-bold">
          <Col>Network information</Col>
        </Row>
        <Row className="mt-3 text-center">
        <Col md={4}>
            {routeCoin.selectCoin.urls.explorer.length > 1 ? (
              <Dropdown>
                <Dropdown.Toggle variant="light" size="sm" id="dropdown-basic">
                  Chain explorer
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {routeCoin.selectCoin.urls.explorer.map((web) => (
                    <Dropdown.Item key={web} href={web}>
                      {web}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <a href={routeCoin.selectCoin.urls.explorer}>
                <Button variant="light" size="sm">
                Chain explorer
                </Button>
              </a>
            )}
          </Col>
        </Row>
              <Converter/>
      </Container>
    </aside>
  )}
  </>
  )
}
