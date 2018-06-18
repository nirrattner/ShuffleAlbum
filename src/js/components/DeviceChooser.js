import React from 'react';
import { Button, Col, Glyphicon, FormGroup, Grid, Panel, Radio, Row } from 'react-bootstrap';

import Loading from './Loading';

import '../../css/device-chooser.css';

const DeviceChooser = ({deviceId, devices, devicesLoading, onDeviceChange, onDeviceFetch}) => {
  const deviceChoices = devices.map(device => (
    <Radio
      name="device-choices"
      key={device.id}
      value={device.id}
      checked={device.id === deviceId}
      onChange={onDeviceChange}
    >
      {device.name}
    </Radio>  
  ));

  return (
    <Grid>
      <Row>
        <Col md={6} mdOffset={3}>
          <Panel>
            <Panel.Heading>
              <span>Available Devices</span>
              <Button
                className="refresh-button"
                bsSize="xsmall"
                onClick={onDeviceFetch}
              >
                <Glyphicon glyph="refresh" /> Refresh
              </Button>
            </Panel.Heading>
            <Panel.Body>
              <FormGroup className="device-chooser">
                <Loading loading={devicesLoading} />
                {deviceChoices}
              </FormGroup>
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    </Grid>
  );
};

export default DeviceChooser;
