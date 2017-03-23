let HOST = process.env.HOST;
let PORT = process.env.PORT || 3000;

module.exports = {
    'Google main page': function(client) {
	    client.url(`http://${HOST}:${PORT}/?currentComponentId=opuscapita-react-dates%2F0.0.1%2FDateRange&maxContainerWidth=100%25&showSidebar=false`);
	    client.expect.element('[class^=DateRange]').to.be.present;
      client.click('[class^=DateInput]');

	    client.end();
    }
};
