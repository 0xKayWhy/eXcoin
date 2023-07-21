import React, { useState, useEffect } from "react";
import { Table, Container, Image, Col, Row, Spinner,Dropdown } from "react-bootstrap";
import Page from "./Page";
import axiosConfig from "../config/axios";
import { useNavigate } from "react-router-dom";
import { Cards } from "./Cards";
import { useRoute } from "../context";

export default function Listing() {
  const routeCoin = useRoute();
  const navi = useNavigate();

  const handleClick = async (e) => {
    await routeCoin.setSelectCoin(e);
    navi(`/currencies/${e.name}`);
  };

  const handleRow = async (e) => {
    try {
        console.log("CurrentPage", routeCoin.currentPage)
      await routeCoin.setRowFormat(e);
      await routeCoin.setRowNum((routeCoin.currentPage -1) * e +1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
        <Cards />
      {routeCoin.display === undefined ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>  
          <Row className="mt-3"> 
          <Col md={1}>Show rows</Col>
          <Col><Dropdown >
      <Dropdown.Toggle size="sm" variant="secondary" id="dropdown-basic">
        {routeCoin.rowFormat}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=> handleRow(20)}>20</Dropdown.Item>
        <Dropdown.Item onClick={()=> handleRow(50)}>50</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown></Col>
          </Row>
    
          <div  className="mt-2"style={{ overflowX: "auto",maxHeight: "500px"  }}>
          <div className="stickTop">
          <Table hover>
            <thead className="stickTop ">
              <tr>
                <th className="stickLeft"></th>
                <th className="stickLeft">#</th>
                <th className="stickLeft">Name</th>
                <th className="price-column">Price</th>
                <th>1h%</th>
                <th>24h%</th>
                <th>7d%</th>
                <th>Market Cap</th>
                <th>Volumn(24h)</th>
                <th>Circulating Supply</th>
                <th>Last 7 Days</th>
              </tr>
            </thead>
            {routeCoin.display.map((list) => (
              <tbody key={list.id} style={{ fontSize: 15 }}>
                <tr>
                  <td className="stickLeft">*</td>
                  <td className="stickLeft">{list.cmc_rank}</td>
                  <td
                    onClick={() => handleClick(list)}
                    className="text-decoration-none text-dark fw-bold stickLeft"
                    style={{ cursor: "pointer" }}
                  >
                    <Row>
                      <Col md={3}>
                        <Image src={list.logo} alt="Logo" roundedCircle fluid />
                      </Col>
                      <Col>
                        {list.name}
                        <span className="text-muted ms-2 fw-normal">
                          {list.symbol}
                        </span>
                      </Col>
                    </Row>
                  </td>
                  {list.quote.USD.price < 0.0001 ? (
                    <td  className="price-column">
                      $
                      {list.quote.USD.price.toLocaleString(undefined, {
                        maximumFractionDigits: 8,
                        minimumFractionDigits: 8,
                      })}
                    </td>
                  ) : list.quote.USD.price < 1 ? (
                    <td className="price-column">
                      $
                      {list.quote.USD.price.toLocaleString(undefined, {
                        maximumFractionDigits: 4,
                        minimumFractionDigits: 4,
                      })}
                    </td>
                  ) : (
                    <td className="price-column">
                      $
                      {list.quote.USD.price.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  )}
                  <td>{list.quote.USD.percent_change_1h.toFixed(2)}%</td>
                  <td>{list.quote.USD.percent_change_24h.toFixed(2)}%</td>
                  <td>{list.quote.USD.percent_change_7d.toFixed(2)}%</td>
                  <td>
                    $
                    {list.quote.USD.market_cap.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td>
                    $
                    {list.quote.USD.volume_24h.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td>
                    {list.circulating_supply.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                    <span className="ms-2">{list.symbol}</span>
                  </td>
                  <td
                    onClick={() => handleClick(list.name)}
                    className="text-decoration-none text-dark fw-bold"
                    style={{ cursor: "pointer" }}
                  >
                    <Image
                      src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${list.id}.svg`}
                      alt="graph"
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
          </div>
          </div>

        </>
      )}

      <Page />
    </Container>
  );
}
