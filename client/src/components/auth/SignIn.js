import React, { Component } from 'react';
import {userService} from '../../services/'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';

class SignIn extends Component {
  constructor(props) {
    super(props);

    userService.logout();

    this.state = {
      username: "",
      password: "",
      error: ""
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        userService.login(values.username, values.password).then(
          user => {
            const { from } = this.props.location.state || {from: { pathname: "/" }};
            this.props.history.push(from);
          },
          error => this.setState({ error })
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row style={{top: 80}}>
      <Col span={5} offset={9}>
        <h1 style={{paddingBottom: 40, paddingLeft: 60}}>Music App</h1>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a style={{float: 'right'}} href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>
            Log in
          </Button>
        </Form.Item>
      </Form>
      {this.state.error && <div className={"alert alert-danger"}>{this.state.error}</div>}
      </Col>
    </Row>
    );
  }
}
const Login = Form.create()(SignIn);
export default Login