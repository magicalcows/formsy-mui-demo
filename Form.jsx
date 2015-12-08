// Based on example from: https://github.com/rblakeley/pro-camper/blob/master/app/components/Form.js

injectTapEventPlugin();

Form = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext(){
    return {
      muiTheme: Styles.ThemeManager.getMuiTheme(Styles.LightRawTheme)
    }
  },

  getInitialState() {
    return {
      canSumbit: false
    };
  },

  errorMessages: {
    wordsError: "Please only use letters",
    numericError: "Please provide a number",
    urlError: "Please provide a valid URL"
  },

  selectFieldItems: [
    { payload: 'never', text: 'Never' },
    { payload: 'nightly', text: 'Every Night' },
    { payload: 'weeknights', text: 'Weeknights' },
    { payload: 'weekends', text: 'Weekends' },
    { payload: 'weekly', text: 'Weekly' }
  ],

  styles: {
    paperStyle: {
      width: 300,
      margin: 20,
      padding: 20
    },
    switchStyle: {
      marginBottom:16
    },
    submitStyle: {
      marginTop: 32
    }
  },

  enableButton() {
    this.setState({
      canSubmit: true
    });
  },

  disableButton() {
    this.setState({
      canSubmit: false
    });
  },

  submitForm(data) {
    alert(JSON.stringify(data, null, 4));
  },

  notifyFormError(data) {
    console.error('Form error:', data);
  },

  render() {
    let {paperStyle, switchStyle, submitStyle } = this.styles;
    let { wordsError, numericError, urlError } = this.errorMessages;

    return (
      <Paper style={paperStyle}>

        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError} >

          <FormsyText
            name="name"
            validations="isWords"
            validationError={wordsError}
            required
            hintText="What is your name?"
            floatingLabelText="Name" />

          <FormsyText
            name="age"
            validations="isNumeric"
            validationError={numericError}
            hintText="Are you a wrinkly?"
            floatingLabelText="Age (optional)" />

          <FormsyText
            name="url"
            validations="isUrl"
            validationError={urlError}
            required
            defaultValue="http://"
            hintText="http://www.example.com"
            floatingLabelText="URL" />

          <FormsySelect
            name="frequency"
            required
            floatingLabelText="How often do you?"
            menuItems={this.selectFieldItems}/>

          <FormsyDate
            name="date"
            required
            floatingLabelText="Date" />

          <FormsyTime
            name="time"
            required
            floatingLabelText="Time" />

          <FormsyCheckbox
            name="agree"
            label="Do you agree to disagree?"
            defaultChecked={true}
            style={switchStyle} />

          <FormsyToggle
            name="toggle"
            label="Toggle"
            style={switchStyle} />

          <FormsyRadioGroup name="shipSpeed" defaultSelected="not_light">
            <FormsyRadio
              value="light"
              label="prepare for light speed"
              style={switchStyle} />
            <FormsyRadio
              value="not_light"
              label="light speed too slow"
              style={switchStyle}/>
            <FormsyRadio
              value="ludicrous"
              label="go to ludicrous speed"
              style={switchStyle}
              disabled={true}/>
          </FormsyRadioGroup>

          <RaisedButton
            style={submitStyle}
            type="submit"
            label="Submit"
            disabled={!this.state.canSubmit} />
        </Formsy.Form>
      </Paper>
    );
  }
});
