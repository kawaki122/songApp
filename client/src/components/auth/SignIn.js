import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox, Row, Col, Spin, Alert } from 'antd';
import { login, logout } from '../../store/actions/authActions'

class SignIn extends Component {
  constructor(props) {
    super(props);
    logout();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.username, values.password);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error, pending } = this.props;
    //if(token) <Redirect to="/" />
    if (pending) return <Spin size="large" />
    return (
      <Row style={{ top: 80 }}>
        <Col span={5} offset={9}>
          <h1 style={{ paddingBottom: 40, paddingLeft: 60 }}>Music App</h1>
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
              <a style={{ float: 'right' }} href="">
                Forgot password
          </a>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Log in
          </Button>
            </Form.Item>
          </Form>
          {error && <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
          />}
        </Col>
      </Row>
    );
  }
}
const Login = Form.create()(SignIn);
const mapStateToProps = (state) => {
  return {
    pending: state.auth.pending,
    error: state.auth.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    login: (name, password) => dispatch(login(name, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)