const chai = require('chai')
const nock = require('nock')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
const API_PORT = process.env.API_PORT || 9123
chai.use(chaiAsPromised)

// Configure and import consumer API
// Note that we update the API endpoint to point at the Mock Service
const API_HOST = `http://localhost:${API_PORT}`

describe('Consumer', () => {
	describe('when a call to the Provider is made', () => {
		const date = '2013-08-16T15:31:20+10:00'
		const {fetchProviderData} = require('../client')

		nock(API_HOST)
		  .get('/provider')
		  .query({validDate: /.*/})
		  .reply(200, {
				test: 'NO',
				date: date,
				count: 1000
			})

		it('can process the JSON payload from the provider', done => {
			const response = fetchProviderData()

			expect(response).to.eventually.have.property('value', 0.1)
			expect(response).to.eventually.have.property('date', date).notify(done)
		})
	})
})
