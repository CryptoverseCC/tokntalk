import React, { Component } from 'react';
import styled from 'styled-components';

const ButtonsContainer = styled.div`
  margin-bottom: 10px;
`;

const FormContainer = styled.div`
  background-color: #f3f6ff;
  border-radius: 12px;
  box-shadow: inset 1px 2px 4px 0 rgba(38, 77, 217, 0.15);
  padding: 15px;
  margin-bottom: 10px;
`;

const Toolbar = styled(
  class Toolbar extends Component {
    state = {
      open: false,
      form: null,
      buttons: null,
      forms: null,
    };

    componentDidMount() {
      this.buttons = this.props.children[0].props.children;
      this.forms = this.props.children[1].props.children;
      this.setState({
        forms: this.forms.map((child) =>
          React.cloneElement(child, {
            onClose: () => {
              this.setState({ open: false, form: null });
            },
          }),
        ),
        buttons: this.buttons.map((child, index) => {
          let number = index;
          return React.cloneElement(child, {
            key: number,
            onClick: () => {
              this.setState({ open: true, form: this.state.forms[number] });
            },
          });
        }),
      });
    }

    render() {
      const { open, form, buttons } = this.state;
      const { boosts, entity } = this.props;

      return (
        <React.Fragment>
          <ButtonsContainer>{buttons}</ButtonsContainer>
          {open && <FormContainer>{form}</FormContainer>}
        </React.Fragment>
      );
    }
  },
)`
  display: flex;
  flex-direction: column;
`;

export default Toolbar;
