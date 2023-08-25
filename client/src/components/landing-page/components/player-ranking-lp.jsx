// player ranking section for our landing-page
// watch list carousel for our landing page.

// react imports
import React, { useState, useEffect } from "react";
// global styles for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Container, Row, Col, Media, Card } from "reactstrap"
import { data, images } from "./mock-data/lp-data.js"

// we need to look into the following questions:
// how many pings can we make to the api in an hour?
  // we can make 60 requests per minute
// should we store our data in our own data base just in case we exceed the limit?
  // note: we can store the data as a whole very easily to a table in postgres
// how do I want the data displayed?
// should we pre-sort by categories to start?
// could we do that in a database query to start with?

function PlayerRankingLP () {

  // useState here
  const [pageIndex, setPageIndex] = useState(1);
  // useEffect here

  // update pageIndex here
  function updatePageIndex (e) {
    console.log(e.target.name);
    e.preventDefault();
    if (e.target.name === "previousPage" && pageIndex > 1) {
      var newIndex = pageIndex - 1
      setPageIndex(newIndex)
    } else if (e.target.name === "nextPage" && pageIndex < (data.length / 10)) {
      var newIndex = pageIndex + 1
      setPageIndex(newIndex)
    }
  }

  return (
    <Container style={{height: "100%"}}>
      <Row style={{height: "5%"}}>
        <h2 style={{border: "solid black 1px", marginBottom: "0"}}>Player Rankings</h2>
      </Row>
      <Row style={{minHeight: "35%"}}>
        <Table style={{border: "solid 1px"}}>
          <thead>
            <tr>
              <th>
                Player
              </th>
              <th>
                FG %
              </th>
              <th>
                FT %
              </th>
              <th>
                3PM
              </th>
              <th>
                REB
              </th>
              <th>
                AST
              </th>
              <th>
                STL
              </th>
              <th>
                BLK
              </th>
              <th>
                TO
              </th>
              <th>
                PTS
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map( (currentPlayer, index) => {
              var fg = (currentPlayer.fg_pct * 100)
              if (fg === 100) {
                fg = 100;
              } else if (fg === 0) {
                fg = "0.00"
              } else {
                fg = fg.toFixed(1)
              }
              var ft = (currentPlayer.ft_pct * 100)
              if (ft === 100) {
                ft = 100;
              } else if (ft === 0) {
                ft = "0.00"
              } else {
                ft = ft.toFixed(1)
              }
              if (!fg) {
                fg = "0.00"
              }
              if (!ft) {
                fg = "0.00"
              }

              if (index <= 10 * pageIndex && index >= ((pageIndex * 10) - 10)) {
                return (
                  <tr>
                    <th>
                    {currentPlayer.player.first_name} {currentPlayer.player.last_name}
                    </th>
                    <th>
                      {fg}%
                    </th>
                    <th>
                      {ft}%
                    </th>
                    <th>
                      {currentPlayer.fg3m}
                    </th>
                    <th>
                      {currentPlayer.reb}
                    </th>
                    <th>
                      {currentPlayer.ast}
                    </th>
                    <th>
                      {currentPlayer.stl}
                    </th>
                    <th>
                      {currentPlayer.blk}
                    </th>
                    <th>
                      {currentPlayer.turnover}
                    </th>
                    <th>
                      {currentPlayer.pts}
                    </th>
                  </tr>
                )
              }
            })}
          </tbody>
        </Table>
      </Row>
      <Row xs={12} style={{textAlign: "center", width: "100%", marginBottom: "5%"}}>
        <Col>
         <Button name={"previousPage"} onClick={updatePageIndex} style={{marginRight: "0.5%"}}>
          Prev
         </Button>

          Page {pageIndex}

          <Button name={"nextPage"} onClick={updatePageIndex} style={{marginLeft: "0.5%"}}>
            Next
         </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default PlayerRankingLP;