import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Row from 'react-bootstrap/Row';
import { ArrowClockwise } from 'react-bootstrap-icons';

import Loading from './Loading';

import '../../css/device-chooser.css';

const DeviceChooser = ({deviceId, devices, devicesLoading, onDeviceChange, onDeviceFetch}) => {
  const deviceChoices = devices.map(device => (
    <Form.Check
      name="device-choices"
      type="radio"
      key={device.id}
      value={device.id}
      checked={device.id === deviceId}
      label={device.name}
      onChange={onDeviceChange}
    />
  ));

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md={6} mdOffset={3}>
          <Card>
            <Card.Header>
              <span>Available Devices</span>
              <Button
                className="refresh-button btn-secondary btn-sm"
                onClick={onDeviceFetch}
              >
                <ArrowClockwise className="refresh-button-icon" /> Refresh
              </Button>
            </Card.Header>
            <Card.Body>
              <Form className="device-chooser">
                <Loading loading={devicesLoading} />
                {deviceChoices}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DeviceChooser;
