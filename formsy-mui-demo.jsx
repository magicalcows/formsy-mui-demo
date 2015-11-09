if (Meteor.isClient) {
  Meteor.startup(function () {
    // Use Meteor.starapptup to render the component after the page is ready
    ReactDOM.render(<Form />, document.getElementById("render-target"));
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
