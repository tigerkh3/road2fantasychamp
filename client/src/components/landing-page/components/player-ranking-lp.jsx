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
// should we store our data in our own data base just in case we exceed the limit?
  // note: we can store the data as a whole very easily to a table in postgres
// how do I want the data displayed?
// should we pre-sort by categories to start?
// could we do that in a database query to start with?

function PlayerRankingLP () {
  return (
    <Container style={{height: "100%"}}>
      <Row style={{height: "10%"}}>
        <h2 style={{border: "solid black 1px"}}>Player Rankings</h2>
      </Row>
      <Row>
        <Table style={{marginTop: "0.5%", border: "solid 1px"}}>
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
              var fgPct = currentPlayer.fg_pct.toString();
              var ftPct = currentPlayer.ft_pct.toString();
              if (ftPct[0] === "1") {
                ftPct = "100"
              } else if (ftPct === "0") {
                ftPct = "0"
              } else {
                if (ftPct[4]) {
                  ftPct = ftPct[2] + ftPct[3] + "." + ftPct[4]
                } else {
                  ftPct = ftPct[2] + ftPct[3]
                }

              }

              if (fgPct[0] === "1") {
                ftPct = "100"
              } else if (fgPct === "0") {
                ftPct = "0"
              } else {
                if (fgPct[4]) {
                  fgPct = fgPct[2] + fgPct[3] + "." + fgPct[4];
                } else {
                  fgPct = fgPct[2] + fgPct[3];
                }
              }

              if (index <= 20) {
                return (
                  <tr>
                    <th>
                    {currentPlayer.player.first_name} {currentPlayer.player.last_name}
                    </th>
                    <th>
                      {fgPct}%
                    </th>
                    <th>
                      {ftPct}%
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
    </Container>
  )
}

export default PlayerRankingLP;