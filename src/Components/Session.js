import React, { Component } from "react";
import { Card, Col } from "antd";

export default class Session extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{ paddingTop: "5%" }}
        className="site-card-border-less-wrapper"
      >
        <Col offset={5}>
          {this.props.data.map((session) => (
            <Card
              key={session.id}
              title={session.name}
              style={{ width: "80%" ,paddingBottom: "2%"}}
              headStyle={{
                fontWeight: "bold",
                color: "white",
                backgroundColor: "black",
              }}
            >
              <p class="bold">
                Fee type : <span class="thin">{session.fee_type}</span>
              </p>
              <p class="bold">
                Available Capacity :
                <span class="thin"> {session.available_capacity}</span>
              </p>
              <p class="bold">
                Minimum age limit :
                <span class="thin"> {session.min_age_limit}</span>
              </p>
              <p class="bold">
                Vaccine : <span class="thin">{session.vaccine}</span>
              </p>
              <p class="bold">
                Slots :
                <span class="thin">
                  {session.slots.map((slot) => (
                    <p key={slot.id}>{slot}</p>
                  ))}
                </span>
              </p>
            </Card>
          ))}
        </Col>
      </div>
    );
  }
}
