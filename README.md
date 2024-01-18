# Interview-Tests
The "test" project is for testing API responses and status on [GoRest](https://gorest.co.in/).

To run this project, pull down to your local machine.
Install Node. The version used here was Node 20. Likely compatible with earlier Node versions, but untested.

Run `npm install` from the root directory [Interview-Tests] of this project to install dependencies.

To run the tests locally and have results report back in the console,
run `npm run test` from the root directory of this project.
Results will be output to your terminal.

Update the bearer token for a different user if needed.


Current test results can be found in Interview-Tests/results (both API and Cypress results).

==========

Cypress UI Integration Tests are under the directory for UI Integration Tests. There is a separate README for that project in that directory. You will need to run `npm install` from that directory for separate packages.

Test Exclusions:

API Tests

Could not determine how to trigger a 405 Method Not Allowed for the API tests. 
Most of the API's use the same root for POST and GET. Running a POST of the root GET API 
would just throw a 422.

Cypress Test:

Kindle Paperwhite does not have the "All-New" tag. I think since it is the 2022 version and it is now a year old.
Proceeded to get the latest Kindle Paperwhite.

Did not implement the code for specific Kindle features.

The "Additional Protection Policy" popup behavior was inconsistent. Added a handling to wait for it to appear, especially when re-running, adding significant time to the tests. 
If this app were hosted by us, I would study the app and work with team to determine precise conditions for it to occur.
Cypress had some great feedback about handling Conditional Scenarios. 
I would also spend more time studying the XHR calls that generate a full page with media and add some wait untils around aliases (cy.wait('@mediaLoaded')) to reduce flakiness.

