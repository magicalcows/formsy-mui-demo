// Based on sample from: https://github.com/rblakeley/pro-camper/blob/master/app/components/Form.js

injectTapEventPlugin();

let { Paper, Checkbox, RaisedButton } = MUI;
let { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } = FMUI;

Form = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext(){
    return {
      muiTheme: MUI.Styles.ThemeManager.getMuiTheme(MUI.Styles.LightRawTheme)
    }
  },

  getInitialState: function () {
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
    paper: {
      width: 300,
      margin: 20,
      padding: 20
    },
    submit: {
      marginTop: 32
    }
  },

  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },

  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },

  submitForm: function (model) {
    console.log("Model: ", model);
    alert(
      `Name:  ${model.name}\n
      Chucked: ${model.chuck}\n
      URL: ${model.url}\n
      Frequency: ${model.frequency}\n
      Date: ${model.date}\n
      Time: ${model.time}\n
      Agree: ${model.agree}\n
      Toggle: ${model.toggle}\n
      Speed: ${model.shipSpeed}\n
    `);
  },

  notifyFormError: function (model) {
    console.error('Form error:', model);
  },

  render: function () {
    let styles = this.styles;
    let { wordsError, numericError, urlError } = this.errorMessages;

    return (
        <Paper style={styles.paper}>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}
            style={styles.form}
            mapping={this.mapInputs} >

              <FormsyText
              name='name'
              validations='isWords'
              validationError={wordsError}
              required
              hintText="What is your name?"
              floatingLabelText="Name" />

            <FormsyText
              name='chuck'
              validations='isNumeric'
              validationError={numericError}
              required
              hintText="wood could a woodchuck chuck?"
              floatingLabelText="How much" />

            <FormsyText
              name='url'
              validations='isUrl'
              validationError={urlError}
              required
              hintText="Where can we find out more?"
              floatingLabelText="URL" />

            <FormsySelect
              name='frequency'
              required
              floatingLabelText="How often do you?"
              menuItems={this.selectFieldItems}/>

            <FormsyDate
              name='date'
              required
              floatingLabelText="Date" />

            <FormsyTime
              name='time'
              required
              floatingLabelText="Time" />

            <FormsyCheckbox
              name='agree'
              label="Do you agree to disagree?"
              defaultChecked={true}
              style={{marginBottom:16}} />

            <FormsyToggle
              name='toggle'
              label="Toggle"
              style={{marginBottom:16}} />

            <FormsyRadioGroup name="shipSpeed" defaultSelected="not_light">
              <FormsyRadio
                value="light"
                label="prepare for light speed"
                style={{marginBottom:16}} />
              <FormsyRadio
                value="not_light"
                label="light speed too slow"
                style={{marginBottom:16}}/>
              <FormsyRadio
                value="ludicrous"
                label="go to ludicrous speed"
                style={{marginBottom:16}}
                disabled={true}/>
            </FormsyRadioGroup>

            <RaisedButton
              style={styles.submit}
              type="submit"
              label="Submit"
              disabled={!this.state.canSubmit} />
          </Formsy.Form>
        </Paper>
    );
  }
});